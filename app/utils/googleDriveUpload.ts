/**
 * Google Drive Upload Utility
 * Uses Resumable Upload to bypass Vercel's 4.5MB body size limit
 * 1. Server initializes upload session and returns upload URL
 * 2. Client uploads directly to Google Drive using that URL
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

        // Step 1: Initialize resumable upload session (get upload URL from server)
        onProgress?.(5) // Show initial progress

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

        if (!initResponse.ok || !initData.success || !initData.uploadUrl) {
            throw new Error(initData.error || 'Failed to initialize upload')
        }

        onProgress?.(10) // Initialization complete

        // Step 2: Upload file directly to Google Drive using the resumable upload URL
        const uploadUrl = initData.uploadUrl

        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
                'Content-Length': file.size.toString(),
            },
            body: file,
        })

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text()
            throw new Error(`Upload failed: ${errorText}`)
        }

        const uploadResult = await uploadResponse.json()

        onProgress?.(100) // Upload complete

        const result: UploadResult = {
            success: true,
            fileId: uploadResult.id,
            fileName: uploadResult.name || initData.fileName,
            viewLink: `https://drive.google.com/file/d/${uploadResult.id}/view`,
        }

        onComplete?.(result)
        return result

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred'
        onError?.(errorMsg)
        return { success: false, error: errorMsg }
    }
}

/**
 * Upload with XMLHttpRequest for real progress tracking
 */
export async function uploadToGoogleDriveWithProgress(options: UploadOptions): Promise<UploadResult> {
    const { file, onProgress, onComplete, onError } = options

    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided')
        }

        if (!file.type.startsWith('video/')) {
            throw new Error('Invalid file type. Only video files are allowed.')
        }

        // Step 1: Initialize resumable upload session
        onProgress?.(0)

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

        if (!initResponse.ok || !initData.success || !initData.uploadUrl) {
            throw new Error(initData.error || 'Failed to initialize upload')
        }

        // Step 2: Upload with progress using XMLHttpRequest
        const uploadUrl = initData.uploadUrl

        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100)
                    onProgress?.(percentComplete)
                }
            })

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const uploadResult = JSON.parse(xhr.responseText)
                        const result: UploadResult = {
                            success: true,
                            fileId: uploadResult.id,
                            fileName: uploadResult.name || initData.fileName,
                            viewLink: `https://drive.google.com/file/d/${uploadResult.id}/view`,
                        }
                        onComplete?.(result)
                        resolve(result)
                    } catch {
                        const errorMsg = 'Failed to parse upload response'
                        onError?.(errorMsg)
                        resolve({ success: false, error: errorMsg })
                    }
                } else {
                    const errorMsg = `Upload failed with status ${xhr.status}`
                    onError?.(errorMsg)
                    resolve({ success: false, error: errorMsg })
                }
            })

            xhr.addEventListener('error', () => {
                const errorMsg = 'Network error during upload'
                onError?.(errorMsg)
                resolve({ success: false, error: errorMsg })
            })

            xhr.open('PUT', uploadUrl)
            xhr.setRequestHeader('Content-Type', file.type)
            xhr.send(file)
        })

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
