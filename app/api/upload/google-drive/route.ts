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
// Only this endpoint is needed - client uploads directly to Google after
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

// Runtime config
export const runtime = 'nodejs'
