'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface VimeoPlayerProps {
    videoId: string
    title?: string
    className?: string
    priority?: boolean
}

const VimeoPlayer = ({ videoId, title, className, priority = false }: VimeoPlayerProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

    useEffect(() => {
        // Fetch higher resolution thumbnail unique to the video
        // Vimeo API v2 returns an array where [0] is the info object
        fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
            .then(res => res.json())
            .then(data => {
                if (data && data[0]) {
                    setThumbnailUrl(data[0].thumbnail_large)
                }
            })
            .catch((err) => {
                console.error("Failed to fetch Vimeo thumbnail", err)
            })
    }, [videoId])

    if (isLoaded) {
        return (
            <div className={twMerge("w-full h-full", className)}>
                <iframe
                    className="w-full h-full"
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    title={title}
                />
            </div>
        )
    }

    return (
        <div
            className={twMerge("relative w-full h-full bg-gray-200 cursor-pointer group overflow-hidden", className)}
            onClick={() => setIsLoaded(true)}
            role="button"
            aria-label={`Play video: ${title || 'Vimeo Video'}`}
        >
            {thumbnailUrl ? (
                <Image
                    src={thumbnailUrl}
                    alt={title || "Video thumbnail"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={priority}
                    unoptimized
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                    <span className="text-sm">Loading thumbnail...</span>
                </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-[#00adef] group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-10 md:h-10 ml-1">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Title Overlay (Optional) */}
            {title && (
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                    <p className="text-white font-medium truncate">{title}</p>
                </div>
            )}
        </div>
    )
}

export default VimeoPlayer
