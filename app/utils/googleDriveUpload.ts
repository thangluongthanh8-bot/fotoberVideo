/**
 * Google Drive Upload Utility
 * Uploads video through Next.js API proxy to bypass CORS
 */

export interface UploadProgress {
    loaded: number
    total: number
    percentage: number
    speed?: string
    eta?: string
}

export interface UploadResult {
    success: boolean
    fileId?: string
    fileName?: string
    viewLink?: string
    error?: string
}

export interface UploadOptions {
    file: File
    chunkSize?: number // Not used anymore but kept for compatibility
    onProgress?: (progress: UploadProgress) => void
    onComplete?: (result: UploadResult) => void
    onError?: (error: string) => void
}

/**
 * Upload a video file to Google Drive through server proxy
 */
export async function uploadToGoogleDrive(options: UploadOptions): Promise<UploadResult> {
    const {
        file,
        onProgress,
        onComplete,
        onError
    } = options

    const startTime = Date.now()

    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided')
        }

        // Validate file type (only videos)
        const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-matroska']
        if (!allowedTypes.includes(file.type) && !file.type.startsWith('video/')) {
            throw new Error('Invalid file type. Only video files are allowed.')
        }

        console.log(`Starting upload: ${file.name} (${formatFileSize(file.size)})`)

        // Create FormData
        const formData = new FormData()
        formData.append('file', file)

        // Upload through proxy using XHR for progress tracking
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            // Track upload progress
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const elapsed = (Date.now() - startTime) / 1000
                    const speed = event.loaded / elapsed
                    const remaining = (event.total - event.loaded) / speed

                    onProgress({
                        loaded: event.loaded,
                        total: event.total,
                        percentage: Math.round((event.loaded / event.total) * 100),
                        speed: formatFileSize(speed) + '/s',
                        eta: formatTime(remaining),
                    })
                }
            })

            // Handle completion
            xhr.addEventListener('load', () => {
                console.log('XHR load event, status:', xhr.status)
                console.log('XHR response:', xhr.responseText)

                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const responseData = JSON.parse(xhr.responseText)
                        console.log('Parsed response data:', responseData)

                        if (responseData.success && responseData.viewLink) {
                            const result: UploadResult = {
                                success: true,
                                fileId: responseData.fileId,
                                fileName: responseData.fileName,
                                viewLink: responseData.viewLink,
                            }
                            console.log('Upload successful!', result)
                            if (onComplete) onComplete(result)
                            resolve(result)
                        } else {
                            const errorMsg = responseData.error || 'Upload failed - no view link returned'
                            console.error(errorMsg)
                            if (onError) onError(errorMsg)
                            resolve({
                                success: false,
                                error: errorMsg
                            })
                        }
                    } catch (parseError) {
                        console.error('Failed to parse response:', parseError)
                        const result: UploadResult = {
                            success: false,
                            error: 'Failed to parse server response'
                        }
                        if (onError) onError(result.error!)
                        resolve(result)
                    }
                } else {
                    let errorMsg = `Upload failed with status ${xhr.status}`
                    try {
                        const errorData = JSON.parse(xhr.responseText)
                        errorMsg = errorData.error || errorData.details || errorMsg
                    } catch {
                        // Ignore parse error
                    }
                    console.error(errorMsg, xhr.responseText)
                    if (onError) onError(errorMsg)
                    reject(new Error(errorMsg))
                }
            })

            // Handle errors
            xhr.addEventListener('error', () => {
                const errorMsg = 'Network error during upload'
                console.error(errorMsg)
                if (onError) onError(errorMsg)
                reject(new Error(errorMsg))
            })

            // Handle abort
            xhr.addEventListener('abort', () => {
                const errorMsg = 'Upload was cancelled'
                console.error(errorMsg)
                if (onError) onError(errorMsg)
                reject(new Error(errorMsg))
            })

            // Send request to our proxy API
            xhr.open('POST', '/api/upload/google-drive', true)
            xhr.send(formData)
        })

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('Upload error:', errorMsg)
        if (onError) onError(errorMsg)
        return {
            success: false,
            error: errorMsg,
        }
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

/**
 * Format time in seconds to human readable string
 */
export function formatTime(seconds: number): string {
    if (!isFinite(seconds) || seconds < 0) return 'calculating...'

    if (seconds < 60) {
        return `${Math.ceil(seconds)}s`
    } else if (seconds < 3600) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.ceil(seconds % 60)
        return `${mins}m ${secs}s`
    } else {
        const hours = Math.floor(seconds / 3600)
        const mins = Math.ceil((seconds % 3600) / 60)
        return `${hours}h ${mins}m`
    }
}

/**
 * Validate file before upload
 */
export function validateVideoFile(file: File, maxSizeMB: number = 300): { valid: boolean; error?: string } {
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-matroska']

    if (!allowedTypes.includes(file.type) && !file.type.startsWith('video/')) {
        return { valid: false, error: 'Chỉ chấp nhận file video (MP4, MOV, AVI, WebM, MKV)' }
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
        return { valid: false, error: `File quá lớn. Tối đa ${maxSizeMB}MB` }
    }

    return { valid: true }
}
