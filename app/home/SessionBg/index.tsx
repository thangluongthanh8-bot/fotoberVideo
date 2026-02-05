'use client'

import ImageBgHome from '@/app/assets/fotober-real-estate-photo-video-editing-services-01.webp'
import ImageBgHome2 from '@/app/assets/fotober-real-estate-photo-video-editing-services-03.webp'
import ImageBgHome3 from '@/app/assets/fotober-real-estate-photo-video-editing-services-04.webp'
import ImageBgHome4 from '@/app/assets/fotober-real-estate-photo-video-editing-services-05.webp'
import ImageBgHome5 from '@/app/assets/fotober-real-estate-photo-video-editing-services-06.webp'
import ImageBgHome6 from '@/app/assets/fotober-real-estate-photo-video-editing-services-07.webp'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Link from 'next/link'
import TypeWrite from '@/app/components/typeWrite'

// Minimal Swiper CSS
import 'swiper/css'
import 'swiper/css/pagination'



const ButtonBanner = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className="cursor-pointer hover:bg-[#043263] hover:text-white flex flex-row items-center justify-center text-[#043263] w-[180px] md:w-[260px] h-[37px] md:h-[53px] text-[16px] md:text-[24px] bg-white rounded-[12px] font-bold"
    >
      {title}
    </div>
  )
}

function SessionBg() {
  const handleScroll = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const section = document.querySelector('#bulk-order-form')
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [])

  return (
    <div className="relative w-full h-[600px] xl:h-[700px] 2xl:h-[850px]">
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/walk.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 w-full h-full bg-[#00000085] z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
        <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
          <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
            Transforming Real Estate - Elevating Visions
          </div>
          <div className="text-white text-center text-[16px] md:text-[20px] font-bold animate-fade-in-up">
            Top-notch Real Estate Photo &amp; Video Editing Service
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mt-10 md:mt-20 animate-fade-in-up">
          <Link href="https://orders.fotober.com/">
            <ButtonBanner title="START NOW" />
          </Link>
          <ButtonBanner onClick={handleScroll} title=" BOOK A TRIAL" />
        </div>
      </div>
    </div>
  )
}

export default SessionBg
