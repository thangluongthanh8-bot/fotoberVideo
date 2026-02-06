import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

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

// POST: Initialize resumable upload session with Google Drive
export async function POST(request: NextRequest) {
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

// PUT: Proxy chunk upload to Google Drive (bypasses CORS)
export async function PUT(request: NextRequest) {
    try {
        const resumableUri = request.headers.get('x-resumable-uri')
        const contentRange = request.headers.get('x-content-range')

        if (!resumableUri) {
            return NextResponse.json(
                { error: 'Resumable URI is required' },
                { status: 400 }
            )
        }

        // Get chunk data
        const arrayBuffer = await request.arrayBuffer()

        // Forward chunk to Google Drive
        const uploadResponse = await fetch(resumableUri, {
            method: 'PUT',
            headers: {
                'Content-Length': arrayBuffer.byteLength.toString(),
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

            console.log('=== Upload Complete ===', fileId)

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

// Increase body size limit for this route (max 4MB to stay under Vercel limit)
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}
