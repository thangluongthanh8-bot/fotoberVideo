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

// POST: Initialize resumable upload session with Google Drive
export async function POST(request: NextRequest) {
    const contentType = request.headers.get('content-type') || ''

    // Check if this is initializing a session or uploading directly
    if (contentType.includes('application/json')) {
        return initializeResumableSession(request)
    } else {
        // Direct single-request upload for small files
        return handleDirectUpload(request)
    }
}

// Initialize a resumable upload session with Google Drive
async function initializeResumableSession(request: NextRequest) {
    try {
        const body = await request.json()
        const { fileName, fileType, fileSize } = body

        if (!fileName || !fileType) {
            return NextResponse.json(
                { error: 'fileName and fileType are required' },
                { status: 400 }
            )
        }

        const finalFileName = `${Date.now()}_${fileName}`

        // Get access token
        const accessToken = await oauth2Client.getAccessToken()
        if (!accessToken.token) {
            throw new Error('Failed to get access token')
        }

        // Initialize resumable upload session with Google Drive API
        const initResponse = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Upload-Content-Type': fileType,
                    'X-Upload-Content-Length': fileSize.toString(),
                },
                body: JSON.stringify({
                    name: finalFileName,
                    parents: DRIVE_FOLDER_ID ? [DRIVE_FOLDER_ID] : undefined,
                }),
            }
        )

        if (!initResponse.ok) {
            const errorText = await initResponse.text()
            console.error('Google Drive init error:', errorText)
            throw new Error(`Google Drive API error: ${initResponse.status}`)
        }

        // Get the resumable upload URI from response headers
        const resumableUri = initResponse.headers.get('location')
        if (!resumableUri) {
            throw new Error('No resumable URI returned from Google Drive')
        }

        console.log('=== Resumable Upload Session Created ===')

        return NextResponse.json({
            success: true,
            resumableUri,
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

// Handle direct upload for small files (under 5MB)
async function handleDirectUpload(request: NextRequest) {
    try {
        const fileName = request.headers.get('x-file-name') || `upload_${Date.now()}`
        const fileType = request.headers.get('x-file-type') || 'application/octet-stream'

        const arrayBuffer = await request.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Create readable stream from buffer
        const stream = new Readable()
        stream.push(buffer)
        stream.push(null)

        // Upload to Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: `${Date.now()}_${fileName}`,
                parents: DRIVE_FOLDER_ID ? [DRIVE_FOLDER_ID] : undefined,
            },
            media: {
                mimeType: fileType,
                body: stream,
            },
            fields: 'id,name,webViewLink',
        })

        const fileId = response.data.id
        const viewLink = response.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`

        console.log('=== Direct Upload Complete ===', fileId)

        return NextResponse.json({
            success: true,
            complete: true,
            fileId,
            fileName: response.data.name,
            viewLink,
        })

    } catch (error: any) {
        console.error('Direct upload error:', error?.message)
        return NextResponse.json(
            { error: 'Failed to upload file', details: error?.message },
            { status: 500 }
        )
    }
}

// PUT: Handle chunk upload to Google Drive resumable URI
export async function PUT(request: NextRequest) {
    try {
        const resumableUri = request.headers.get('x-resumable-uri')
        const contentRange = request.headers.get('content-range')
        const contentLength = request.headers.get('content-length')

        if (!resumableUri) {
            return NextResponse.json(
                { error: 'Resumable URI is required' },
                { status: 400 }
            )
        }

        // Get chunk data
        const arrayBuffer = await request.arrayBuffer()

        // Upload chunk directly to Google Drive
        const uploadResponse = await fetch(resumableUri, {
            method: 'PUT',
            headers: {
                'Content-Length': contentLength || arrayBuffer.byteLength.toString(),
                'Content-Range': contentRange || '*/*',
            },
            body: arrayBuffer,
        })

        // Check response status
        if (uploadResponse.status === 200 || uploadResponse.status === 201) {
            // Upload complete
            const fileData = await uploadResponse.json()
            const fileId = fileData.id
            const viewLink = fileData.webViewLink || `https://drive.google.com/file/d/${fileId}/view`

            console.log('=== Resumable Upload Complete ===', fileId)

            return NextResponse.json({
                success: true,
                complete: true,
                fileId,
                fileName: fileData.name,
                viewLink,
            })
        } else if (uploadResponse.status === 308) {
            // Chunk received, more to come
            const range = uploadResponse.headers.get('range')
            const uploadedBytes = range ? parseInt(range.split('-')[1]) + 1 : 0

            return NextResponse.json({
                success: true,
                complete: false,
                uploadedBytes,
            })
        } else {
            const errorText = await uploadResponse.text()
            console.error('Google Drive upload error:', uploadResponse.status, errorText)
            throw new Error(`Upload failed: ${uploadResponse.status}`)
        }

    } catch (error: any) {
        console.error('Chunk upload error:', error?.message)
        return NextResponse.json(
            { error: 'Failed to upload chunk', details: error?.message },
            { status: 500 }
        )
    }
}

// Runtime config
export const runtime = 'nodejs'
