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

// POST: Upload file directly through server (proxy to avoid CORS)
export async function POST(request: NextRequest) {
    console.log('=== Starting Server-Side Upload ===')

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        const fileName = `${Date.now()}_${file.name}`
        console.log('File info:', {
            fileName,
            fileType: file.type,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`
        })

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Create readable stream from buffer
        const stream = new Readable()
        stream.push(buffer)
        stream.push(null)

        // Upload to Google Drive using googleapis
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: DRIVE_FOLDER_ID ? [DRIVE_FOLDER_ID] : undefined,
            },
            media: {
                mimeType: file.type,
                body: stream,
            },
            fields: 'id,name,webViewLink',
        })

        console.log('=== Upload Complete ===')
        console.log('File ID:', response.data.id)
        console.log('File Name:', response.data.name)

        const fileId = response.data.id
        const viewLink = response.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`

        return NextResponse.json({
            success: true,
            fileId: fileId,
            fileName: response.data.name,
            viewLink: viewLink,
        })

    } catch (error: any) {
        console.error('=== Upload Error ===')
        console.error('Error:', error?.message)
        console.error('Details:', error)

        return NextResponse.json(
            {
                error: 'Failed to upload file',
                details: error?.message || 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// Config to allow large file uploads
export const config = {
    api: {
        bodyParser: false,
    },
}
