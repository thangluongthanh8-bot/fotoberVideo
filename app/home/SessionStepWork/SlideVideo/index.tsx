'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import iconNext from '../assets/next.png'
import iconPrev from '../assets/prev.png'
import Image from 'next/image'
const listContentVideo = [
    {
        title: 'Professional Color Grading\n',
        videoId: '1156717297',
    },
    {
        title: 'Contrast and Brightness Adjustment',
        videoId: '1156718733',
    },
    {
        title: 'Advanced Title Animation\n',
        videoId: '1156776793',
    },
    {
        title: 'Denoise Footage\n',
        videoId: '1157056508',
    },
    {
        title: 'Professional Graphic (GG Earth, Border Line,...)\n',
        videoId: '1157059097',
    },
    {
        title: 'Stabilize Footage\n',
        videoId: '1157061494',
    },
    {
        title: 'Real Estate Agent Branding\n',
        videoId: '1157073789',
    },
    {
        title: 'Watermark Branding\n',
        videoId: '1157081554',
    },
    {
        title: 'Delivery of Branded and Unbranded MLS Compliant Video',
        videoId:
            '1157076413',
    },
]

const SlideVideo = () => {


    return (
        <div className="container-custom mt-[30px] md:mt-[50px] mb-[30px] md:mb-[50px] relative px-4 md:px-0">
            <h2 className="text-[20px] md:text-[24px] font-bold text-center text-[#043263] mb-4 md:mb-5">
                10 Steps to Make a Spectacular Real Estate Video
            </h2>
            <div className="slide-team-fade relative list-card-slide-shadow container-custom flex justify-center items-center">
                {/* Navigation buttons - hidden on mobile */}
                <div className="swiper-button-prev !z-[100000] !left-[-10px] md:!left-[-20px] !absolute !top-[40%] !-translate-y-1/2 hidden md:block">
                    <Image alt="Previous video" src={iconPrev} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
                </div>
                <div className="w-full md:max-2xl:px-10 max-w-[1160px] relative">
                    <Swiper
                        modules={[Navigation]}
                        grabCursor={true}
                        loop={true}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 'auto',
                                centeredSlides: true,
                            }
                        }}
                        allowTouchMove
                        spaceBetween={15}
                        className="w-full"
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                    >
                        {listContentVideo.map((item, index) => (
                            <SwiperSlide key={index} className="!w-full md:!w-[600px]">
                                <div
                                    style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}
                                    className="rounded-[10px] shadow-lg"
                                >
                                    <iframe
                                        className="rounded-[10px]"
                                        src={`https://player.vimeo.com/video/${item.videoId}?title=0&byline=0&portrait=0&autopause=0&player_id=0&app_id=58479`}
                                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                        title={item.title}
                                    />
                                </div>
                                <p className="text-[16px] md:text-[20px] font-bold text-center mt-3 md:mt-5 text-[#043263] px-2">
                                    {index + 1}. {item.title}
                                </p>
                            </SwiperSlide>
                        ))}


                    </Swiper>
                </div>
                {/* Navigation buttons - hidden on mobile */}
                <div className="swiper-button-next !z-[100000] !right-[-10px] md:!right-[-20px] !absolute !top-[40%] !-translate-y-1/2 hidden md:block">
                    <Image alt="Next video" src={iconNext} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
                </div>
            </div>
        </div >
    )
}

export default SlideVideo