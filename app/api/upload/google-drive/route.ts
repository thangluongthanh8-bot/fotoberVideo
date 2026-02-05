import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Readable } from 'stream'

const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || ''

// OAuth2 credentials
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
)

// Set refresh token to get access token automatically
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN
})

// Initialize Drive API
const drive = google.drive({ version: 'v3', auth: oauth2Client })

// In-memory storage for chunked uploads
const uploadSessions = new Map<string, {
    chunks: Buffer[]
    fileName: string
    fileType: string
    totalSize: number
    receivedSize: number
}>()

// POST: Handle chunked upload or initialize session
export async function POST(request: NextRequest) {
    const contentType = request.headers.get('content-type') || ''

    // Check if this is a chunk upload or session init
    if (contentType.includes('application/json')) {
        // Initialize upload session
        return initializeSession(request)
    } else {
        // Handle chunk upload
        return handleChunkUpload(request)
    }
}

// Initialize a new upload session
async function initializeSession(request: NextRequest) {
    try {
        const body = await request.json()
        const { fileName, fileType, fileSize } = body

        if (!fileName || !fileType) {
            return NextResponse.json(
                { error: 'fileName and fileType are required' },
                { status: 400 }
            )
        }

        const sessionId = `${Date.now()}_${Math.random().toString(36).substring(7)}`
        const finalFileName = `${Date.now()}_${fileName}`

        uploadSessions.set(sessionId, {
            chunks: [],
            fileName: finalFileName,
            fileType,
            totalSize: fileSize || 0,
            receivedSize: 0,
        })

        // Clean up old sessions after 30 minutes
        setTimeout(() => {
            uploadSessions.delete(sessionId)
        }, 30 * 60 * 1000)

        console.log('=== Upload Session Created ===', sessionId)

        return NextResponse.json({
            success: true,
            sessionId,
            fileName: finalFileName,
        })

    } catch (error: any) {
        console.error('Init session error:', error?.message)
        return NextResponse.json(
            { error: 'Failed to initialize session', details: error?.message },
            { status: 500 }
        )
    }
}

// Handle incoming chunk
async function handleChunkUpload(request: NextRequest) {
    try {
        const sessionId = request.headers.get('x-session-id')
        const chunkIndex = parseInt(request.headers.get('x-chunk-index') || '0')
        const totalChunks = parseInt(request.headers.get('x-total-chunks') || '1')
        const isLastChunk = request.headers.get('x-is-last') === 'true'

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID required' },
                { status: 400 }
            )
        }

        const session = uploadSessions.get(sessionId)
        if (!session) {
            return NextResponse.json(
                { error: 'Session not found or expired' },
                { status: 404 }
            )
        }

        // Get chunk data
        const arrayBuffer = await request.arrayBuffer()
        const chunkBuffer = Buffer.from(arrayBuffer)

        session.chunks[chunkIndex] = chunkBuffer
        session.receivedSize += chunkBuffer.length

        console.log(`Chunk ${chunkIndex + 1}/${totalChunks} received (${chunkBuffer.length} bytes)`)

        // If this is the last chunk, combine and upload to Google Drive
        if (isLastChunk || chunkIndex === totalChunks - 1) {
            console.log('=== All chunks received, uploading to Google Drive ===')

            // Combine all chunks
            const completeBuffer = Buffer.concat(session.chunks)

            // Create readable stream from buffer
            const stream = new Readable()
            stream.push(completeBuffer)
            stream.push(null)

            // Upload to Google Drive
            const response = await drive.files.create({
                requestBody: {
                    name: session.fileName,
                    parents: DRIVE_FOLDER_ID ? [DRIVE_FOLDER_ID] : undefined,
                },
                media: {
                    mimeType: session.fileType,
                    body: stream,
                },
                fields: 'id,name,webViewLink',
            })

            // Clean up session
            uploadSessions.delete(sessionId)

            const fileId = response.data.id
            const viewLink = response.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`

            console.log('=== Upload Complete ===', fileId)

            return NextResponse.json({
                success: true,
                complete: true,
                fileId,
                fileName: response.data.name,
                viewLink,
            })
        }

        // Return progress for intermediate chunks
        return NextResponse.json({
            success: true,
            complete: false,
            chunkIndex,
            receivedSize: session.receivedSize,
            progress: Math.round((session.receivedSize / session.totalSize) * 100),
        })

    } catch (error: any) {
        console.error('Chunk upload error:', error?.message)
        return NextResponse.json(
            { error: 'Failed to process chunk', details: error?.message },
            { status: 500 }
        )
    }
}

// Runtime config
export const runtime = 'nodejs'
