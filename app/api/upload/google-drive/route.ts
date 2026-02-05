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

// POST: Initialize resumable upload session (returns upload URL)
export async function POST(request: NextRequest) {
    console.log('=== Initializing Resumable Upload Session ===')

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
        console.log('File info:', { finalFileName, fileType, fileSize })

        // Get fresh access token
        const { token } = await oauth2Client.getAccessToken()

        if (!token) {
            return NextResponse.json(
                { error: 'Failed to get access token' },
                { status: 500 }
            )
        }

        // Initialize resumable upload session with Google Drive
        const initResponse = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Upload-Content-Type': fileType,
                    'X-Upload-Content-Length': fileSize?.toString() || '0',
                },
                body: JSON.stringify({
                    name: finalFileName,
                    parents: DRIVE_FOLDER_ID ? [DRIVE_FOLDER_ID] : undefined,
                }),
            }
        )

        if (!initResponse.ok) {
            const errorText = await initResponse.text()
            console.error('Init upload error:', errorText)
            return NextResponse.json(
                { error: 'Failed to initialize upload', details: errorText },
                { status: initResponse.status }
            )
        }

        // Get the resumable upload URL from response header
        const uploadUrl = initResponse.headers.get('Location')

        if (!uploadUrl) {
            return NextResponse.json(
                { error: 'No upload URL received from Google Drive' },
                { status: 500 }
            )
        }

        console.log('=== Upload Session Created ===')
        console.log('Upload URL obtained successfully')

        return NextResponse.json({
            success: true,
            uploadUrl,
            fileName: finalFileName,
        })

    } catch (error: any) {
        console.error('=== Init Upload Error ===')
        console.error('Error:', error?.message)
        console.error('Details:', error)

        return NextResponse.json(
            {
                error: 'Failed to initialize upload',
                details: error?.message || 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// Config
export const config = {
    api: {
        bodyParser: true,
    },
}
