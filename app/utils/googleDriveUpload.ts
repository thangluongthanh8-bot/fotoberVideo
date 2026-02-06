/**
 * Google Drive Upload Utility
 * Uses Google Drive Resumable Upload API to bypass Vercel's limitations
 * Upload directly to Google Drive in chunks via resumable session
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

const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB chunks (Google Drive requires multiples of 256KB)

/**
 * Upload a video file to Google Drive using resumable upload
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

        // Step 1: Initialize resumable upload session with Google Drive
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

        // Step 2: Upload file in chunks directly to Google Drive
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
        let uploadedBytes = 0

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE
            const end = Math.min(start + CHUNK_SIZE, file.size)
            const chunk = file.slice(start, end)
            const chunkSize = end - start

            // Content-Range header format: bytes start-end/total
            const contentRange = `bytes ${start}-${end - 1}/${file.size}`

            // Upload chunk via our API (which forwards to Google Drive)
            const chunkResponse = await fetch('/api/upload/google-drive', {
                method: 'PUT',
                headers: {
                    'x-resumable-uri': resumableUri,
                    'Content-Range': contentRange,
                    'Content-Length': chunkSize.toString(),
                },
                body: chunk,
            })

            const chunkData = await chunkResponse.json()

            if (!chunkResponse.ok || !chunkData.success) {
                throw new Error(chunkData.error || `Failed to upload chunk ${i + 1}`)
            }

            uploadedBytes = end
            const progress = Math.round(5 + (uploadedBytes / file.size) * 90) // 5% to 95%
            onProgress?.(progress)

            // If upload is complete (last chunk processed)
            if (chunkData.complete && chunkData.viewLink) {
                onProgress?.(100)
                const result: UploadResult = {
                    success: true,
                    fileId: chunkData.fileId,
                    fileName: chunkData.fileName,
                    viewLink: chunkData.viewLink,
                }
                onComplete?.(result)
                return result
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
