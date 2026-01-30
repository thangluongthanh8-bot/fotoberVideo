'use client'

import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

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

                <div className="">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                centeredSlides: true,
                            },
                            768: {
                                slidesPerView: 3,
                                centeredSlides: false,
                            },
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        style={{
                            "--swiper-pagination-color": "#ffffff",
                            "--swiper-pagination-bullet-inactive-color": "#999999",
                            paddingBottom: "40px"
                        } as React.CSSProperties}
                        className="w-full"
                    >
                        {trendingVideos.map((video) => (
                            <SwiperSlide key={video.id}>
                                <article
                                    className="relative rounded-2xl overflow-hidden shadow-lg w-full"
                                >
                                    <div
                                        className={`relative overflow-hidden rounded-[10px] w-full`}
                                        style={{ paddingBottom: "177.78%", height: 0 }}
                                    >
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full rounded-[10px]"
                                            src={`https://player.vimeo.com/video/${video.videoId}?title=0&byline=0&portrait=0&autopause=0&player_id=0&app_id=58479`}
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            loading="lazy"
                                        />
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default SessionTrending