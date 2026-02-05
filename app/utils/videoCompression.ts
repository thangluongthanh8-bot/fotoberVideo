/**
 * Video Compression Utility using FFmpeg.wasm
 * Compresses video before upload to reduce file size by 60-70%
 */

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

let ffmpeg: FFmpeg | null = null
let isLoading = false

export interface CompressionProgress {
    stage: 'loading' | 'compressing' | 'done' | 'error'
    progress: number // 0-100
    message: string
}

export interface CompressionResult {
    success: boolean
    compressedFile?: File
    originalSize: number
    compressedSize: number
    compressionRatio: number // percentage reduced
    error?: string
}

/**
 * Load FFmpeg library (lazy loading)
 */
async function loadFFmpeg(onProgress?: (progress: CompressionProgress) => void): Promise<FFmpeg> {
    if (ffmpeg && ffmpeg.loaded) {
        return ffmpeg
    }

    if (isLoading) {
        // Wait for existing loading to complete
        while (isLoading) {
            await new Promise(resolve => setTimeout(resolve, 100))
        }
        if (ffmpeg && ffmpeg.loaded) {
            return ffmpeg
        }
    }

    isLoading = true

    try {
        onProgress?.({
            stage: 'loading',
            progress: 0,
            message: 'Loading video compression library...'
        })

        ffmpeg = new FFmpeg()

        // Load FFmpeg core from CDN
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        })

        onProgress?.({
            stage: 'loading',
            progress: 100,
            message: 'Compression library ready'
        })

        return ffmpeg
    } catch (error) {
        console.error('Failed to load FFmpeg:', error)
        throw new Error('Failed to load video compression library')
    } finally {
        isLoading = false
    }
}

/**
 * Compress video file
 * @param file - Original video file
 * @param options - Compression options
 * @param onProgress - Progress callback
 */
export async function compressVideo(
    file: File,
    options: {
        quality?: 'low' | 'medium' | 'high' // low=max compression, high=min compression
        maxWidth?: number
        maxHeight?: number
    } = {},
    onProgress?: (progress: CompressionProgress) => void
): Promise<CompressionResult> {
    const { quality = 'medium', maxWidth = 1280, maxHeight = 720 } = options
    const originalSize = file.size

    // Skip compression for small files (<10MB)
    if (file.size < 10 * 1024 * 1024) {
        console.log('File is small, skipping compression')
        return {
            success: true,
            compressedFile: file,
            originalSize,
            compressedSize: file.size,
            compressionRatio: 0
        }
    }

    try {
        // Load FFmpeg
        const ffmpegInstance = await loadFFmpeg(onProgress)

        onProgress?.({
            stage: 'compressing',
            progress: 0,
            message: 'Starting video compression...'
        })

        // Set up progress tracking
        ffmpegInstance.on('progress', ({ progress }) => {
            const percent = Math.round(progress * 100)
            onProgress?.({
                stage: 'compressing',
                progress: percent,
                message: `Compressing video... ${percent}%`
            })
        })

        // Quality presets (CRF: lower = better quality, larger file)
        const crfValues = {
            high: 23,    // ~40% reduction
            medium: 28,  // ~60% reduction
            low: 32      // ~75% reduction
        }

        const crf = crfValues[quality]
        const inputName = 'input.mp4'
        const outputName = 'output.mp4'

        // Write input file
        await ffmpegInstance.writeFile(inputName, await fetchFile(file))

        // Run compression
        // -c:v libx264 - Use H.264 codec
        // -crf - Quality factor
        // -preset fast - Encoding speed (faster = larger file, slower = smaller)
        // -vf scale - Resize video
        // -c:a aac - Audio codec
        // -b:a 128k - Audio bitrate
        await ffmpegInstance.exec([
            '-i', inputName,
            '-c:v', 'libx264',
            '-crf', crf.toString(),
            '-preset', 'fast',
            '-vf', `scale='min(${maxWidth},iw)':min'(${maxHeight},ih)':force_original_aspect_ratio=decrease`,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
            outputName
        ])

        // Read output file
        const data = await ffmpegInstance.readFile(outputName)
        const compressedBlob = new Blob([data], { type: 'video/mp4' })
        const compressedFile = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, '_compressed.mp4'), {
            type: 'video/mp4'
        })

        const compressedSize = compressedFile.size
        const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100)

        console.log(`Compression complete: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${compressionRatio}% reduction)`)

        onProgress?.({
            stage: 'done',
            progress: 100,
            message: `Compressed: ${compressionRatio}% smaller`
        })

        // Cleanup
        await ffmpegInstance.deleteFile(inputName)
        await ffmpegInstance.deleteFile(outputName)

        return {
            success: true,
            compressedFile,
            originalSize,
            compressedSize,
            compressionRatio
        }

    } catch (error) {
        console.error('Compression error:', error)

        onProgress?.({
            stage: 'error',
            progress: 0,
            message: 'Compression failed, uploading original file'
        })

        // Return original file if compression fails
        return {
            success: false,
            compressedFile: file,
            originalSize,
            compressedSize: file.size,
            compressionRatio: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Check if browser supports FFmpeg.wasm
 */
export function isCompressionSupported(): boolean {
    return typeof SharedArrayBuffer !== 'undefined'
}
