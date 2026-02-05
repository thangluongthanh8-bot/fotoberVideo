/**
 * Google Drive Upload Utility
 * Uploads video through Next.js API proxy to bypass CORS
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
    onComplete?: (result: UploadResult) => void
    onError?: (error: string) => void
}

/**
 * Upload a video file to Google Drive through server proxy
 */
export async function uploadToGoogleDrive(options: UploadOptions): Promise<UploadResult> {
    const { file, onComplete, onError } = options

    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided')
        }

        // Validate file type (only videos)
        if (!file.type.startsWith('video/')) {
            throw new Error('Invalid file type. Only video files are allowed.')
        }

        // Create FormData
        const formData = new FormData()
        formData.append('file', file)

        // Upload through proxy
        const response = await fetch('/api/upload/google-drive', {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()

        if (response.ok && data.success && data.viewLink) {
            const result: UploadResult = {
                success: true,
                fileId: data.fileId,
                fileName: data.fileName,
                viewLink: data.viewLink,
            }
            onComplete?.(result)
            return result
        } else {
            const errorMsg = data.error || 'Upload failed'
            onError?.(errorMsg)
            return { success: false, error: errorMsg }
        }
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
