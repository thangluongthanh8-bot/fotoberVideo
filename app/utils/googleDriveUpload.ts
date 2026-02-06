/**
 * Google Drive Upload Utility
 * Uses Google Drive Resumable Upload API
 * Client uploads directly to Google Drive - bypasses Vercel payload limits
 */

export interface UploadResult {
    success: boolean
    fileId?: string
    fileName?: string
    viewLink?: string
    error?: string
}

export interface UploadOptions {
    file: File
    onProgress?: (progress: number) => void
    onComplete?: (result: UploadResult) => void
    onError?: (error: string) => void
}

const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB chunks (Google requires multiples of 256KB)

/**
 * Upload a video file to Google Drive using resumable upload
 * Client uploads directly to Google Drive after getting resumable URI
 */
export async function uploadToGoogleDrive(options: UploadOptions): Promise<UploadResult> {
    const { file, onProgress, onComplete, onError } = options

    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided')
        }

        // Validate file type (only videos)
        if (!file.type.startsWith('video/')) {
            throw new Error('Invalid file type. Only video files are allowed.')
        }

        onProgress?.(0)

        // Step 1: Get resumable upload URI from our server
        const initResponse = await fetch('/api/upload/google-drive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
            }),
        })

        const initData = await initResponse.json()

        if (!initResponse.ok || !initData.success) {
            throw new Error(initData.error || 'Failed to initialize upload')
        }

        const resumableUri = initData.resumableUri
        onProgress?.(5)

        // Step 2: Upload file in chunks DIRECTLY to Google Drive
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
        let uploadedBytes = 0

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE
            const end = Math.min(start + CHUNK_SIZE, file.size)
            const chunk = file.slice(start, end)
            const chunkSize = end - start

            // Content-Range header format: bytes start-end/total
            const contentRange = `bytes ${start}-${end - 1}/${file.size}`

            // Upload chunk DIRECTLY to Google Drive (not through our server)
            const chunkResponse = await fetch(resumableUri, {
                method: 'PUT',
                headers: {
                    'Content-Length': chunkSize.toString(),
                    'Content-Range': contentRange,
                },
                body: chunk,
            })

            // Check response status
            if (chunkResponse.status === 200 || chunkResponse.status === 201) {
                // Upload complete!
                const fileData = await chunkResponse.json()
                const fileId = fileData.id
                const viewLink = fileData.webViewLink || `https://drive.google.com/file/d/${fileId}/view`

                onProgress?.(100)
                const result: UploadResult = {
                    success: true,
                    fileId,
                    fileName: fileData.name,
                    viewLink,
                }
                onComplete?.(result)
                return result
            } else if (chunkResponse.status === 308) {
                // Chunk received, more to come
                uploadedBytes = end
                const progress = Math.round(5 + (uploadedBytes / file.size) * 90)
                onProgress?.(progress)
            } else {
                // Error
                const errorText = await chunkResponse.text()
                throw new Error(`Upload failed: ${chunkResponse.status} - ${errorText}`)
            }
        }

        throw new Error('Upload completed but no result received')

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred'
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
    }
}

/**
 * Format file size to human readable string
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
