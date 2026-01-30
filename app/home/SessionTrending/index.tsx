'use client'

import React from 'react'
import LazyVideo from '@/app/components/LazyVideo'

// Video data - replace vimeo IDs as needed
const trendingVideos = [
    {
        id: 1,
        videoId: '1118584342',
        title: 'Real Estate Walkthrough',
        alt: 'Real estate walkthrough video showing property interior and exterior views'
    },
    {
        id: 2,
        videoId: '1118585078',
        title: 'Property Showcase',
        alt: 'Professional property showcase video with cinematic transitions'
    },
    {
        id: 3,
        videoId: '1065777684',
        title: 'Aerial Drone Footage',
        alt: 'Stunning aerial drone footage of coastal properties'
    },
]

const SessionTrending = () => {
    return (
        <section
            className="w-full py-16 px-4 bg-[#043263]"
            aria-labelledby="trending-video-heading"
        >
            <div className="container-custom mx-auto">
                {/* Header Section */}
                <header className="text-center mb-10">
                    <h2
                        id="trending-video-heading"
                        className="text-white text-3xl md:text-4xl font-bold mb-4"
                    >
                        Trending Video Editing
                    </h2>
                    <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
                        Discover the latest techniques and trends in video editing that captivate viewers and elevate your listing's impact.
                    </p>
                </header>

                {/* Videos Grid - Using LazyVideo for performance */}
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    {trendingVideos.map((video) => (
                        <article
                            key={video.id}
                            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full md:w-[400px]"
                        >
                            {/* Lazy loaded video - only loads when clicked */}
                            <LazyVideo
                                videoId={video.videoId}
                                title={video.title}
                                aspectRatio="177.78%"
                                className="w-full"
                            />

                            {/* Video title overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
                                <h3 className="text-white font-semibold text-lg text-center">
                                    {video.title}
                                </h3>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SessionTrending