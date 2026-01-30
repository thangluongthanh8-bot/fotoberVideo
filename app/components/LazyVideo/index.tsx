'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'

interface LazyVideoProps {
    videoId: string
    title: string
    thumbnail?: string | StaticImageData
    className?: string
    aspectRatio?: string // e.g., '56.25%' for 16:9, '177.78%' for 9:16
}

/**
 * LazyVideo - Performance optimized video component
 * Shows a thumbnail/placeholder until user interacts, then loads the actual video
 */
const LazyVideo: React.FC<LazyVideoProps> = ({
    videoId,
    title,
    thumbnail,
    className = '',
    aspectRatio = '56.25%', // Default 16:9
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Intersection Observer - only render iframe when in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '100px' } // Start loading 100px before entering viewport
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleLoadVideo = () => {
        setIsLoaded(true)
    }

    // Generate Vimeo thumbnail URL if not provided
    const getThumbnailUrl = () => {
        if (thumbnail) return typeof thumbnail === 'string' ? thumbnail : undefined
        // Vimeo doesn't have a simple thumbnail URL pattern, so we use a placeholder
        return undefined
    }

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-[10px] ${className}`}
            style={{ paddingBottom: aspectRatio, height: 0 }}
        >
            {isInView ? (
                isLoaded ? (
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-[10px]"
                        src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&autopause=0&player_id=0&app_id=58479`}
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={title}
                        loading="lazy"
                    />
                ) : (
                    <button
                        onClick={handleLoadVideo}
                        className="absolute top-0 left-0 w-full h-full bg-gray-900 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:bg-gray-800"
                        aria-label={`Play video: ${title}`}
                    >
                        {thumbnail && typeof thumbnail !== 'string' && (
                            <Image
                                src={thumbnail}
                                alt={title}
                                fill
                                className="object-cover opacity-70 group-hover:opacity-50 transition-opacity"
                            />
                        )}
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-8 h-8 md:w-10 md:h-10 text-[#043263] ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        {/* Video title */}
                        <span className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base font-medium text-center">
                            Click to play: {title}
                        </span>
                    </button>
                )
            ) : (
                // Skeleton placeholder when not in view
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded-[10px]" />
            )}
        </div>
    )
}

export default LazyVideo
