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
    <div className="relative">
      <Swiper
        grabCursor
        loop
        allowTouchMove
        pagination
        centeredSlides
        breakpoints={{
          1: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 10_000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full custom-paging [&>.swiper-pagination>.swiper-pagination-bullet]:bg-white [&>.swiper-pagination>.swiper-pagination-bullet]:h-[10px] [&>.swiper-pagination>.swiper-pagination-bullet]:w-[10px]"
      >
        <SwiperSlide>
          <div className="relative">
            <div className="absolute w-full h-full bg-[#00000085]" />
            <h1 className="absolute opacity-0">Transforming Real Estate - Elevating Visions</h1>
            <div className="absolute top-14 left-0  flex w-full h-full  flex-col justify-center items-center z-10">
              <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
                <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
                  <TypeWrite
                    text='Transforming Real Estate - Elevating Visions'
                  />
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
            <Image
              alt="Fotober real estate photo and video editing services - transforming property visuals"
              src={ImageBgHome}
              width={1920}
              height={850}
              quality={60}
              priority
              fetchPriority="high"
              sizes="100vw"
              className="w-full !h-[650px] md:!h-[850px] object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute w-full h-full bg-[#00000085]" />
            <div className="absolute top-14 left-0  flex w-full h-full  flex-col justify-center items-center z-10">
              <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
                <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
                  <span>TAILORED TO YOUR EVERY NEED</span>
                </div>
                <p className="text-white text-center text-[16px] md:text-[20px] font-bold ">
                  Fotober offers personal care and commitment to each of our customers
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mt-10 md:mt-20">
                <Link href="https://orders.fotober.com/">
                  <ButtonBanner title="START NOW" />
                </Link>
                <ButtonBanner onClick={handleScroll} title=" BOOK A TRIAL" />
              </div>
            </div>
            <Image
              alt="Fotober personalized real estate editing service tailored to your needs"
              src={ImageBgHome6}
              width={1920}
              height={850}
              quality={60}
              loading="lazy"
              sizes="100vw"
              className="w-full !h-[650px] md:!h-[850px] object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute w-full h-full bg-[#00000085]" />
            <div className="absolute top-14 left-0  flex w-full h-full  flex-col justify-center items-center z-10">
              <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
                <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
                  <span>RECREATE YOUR VIRTUAL IMAGINATION </span>
                </div>
                <p className="text-white text-center text-[16px] md:text-[20px] font-bold ">
                  Make your dream house come to life in perfect for with Fotober&apos;s virtual
                  services
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mt-10 md:mt-20">
                <Link href="https://orders.fotober.com/">
                  <ButtonBanner title="START NOW" />
                </Link>
                <ButtonBanner onClick={handleScroll} title=" BOOK A TRIAL" />
              </div>
            </div>
            <Image
              alt="Fotober virtual staging and renovation services for real estate"
              src={ImageBgHome2}
              width={1920}
              height={850}
              quality={60}
              loading="lazy"
              sizes="100vw"
              className="w-full h-[650px] md:h-[850px] object-cover bg-bottom"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute w-full h-full bg-[#00000085]" />
            <div className="absolute top-14 left-0  flex w-full h-full  flex-col justify-center items-center z-10">
              <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
                <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
                  <span>BEAUTIFUL IN AND OUT</span>
                </div>
                <p className="text-white text-center text-[16px] md:text-[20px] font-bold ">
                  Fotober has you covered in diverse styles
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mt-10 md:mt-20">
                <Link href="https://orders.fotober.com/">
                  <ButtonBanner title="START NOW" />
                </Link>
                <ButtonBanner onClick={handleScroll} title=" BOOK A TRIAL" />
              </div>
            </div>
            <Image
              alt="Fotober interior and exterior real estate photo enhancement"
              src={ImageBgHome4}
              width={1920}
              height={850}
              quality={70}
              loading="lazy"
              sizes="100vw"
              className="w-full h-[650px] md:h-[850px] object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute w-full h-full bg-[#00000085]" />
            <div className="absolute top-14 left-0  flex w-full h-full  flex-col justify-center items-center z-10">
              <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
                <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
                  <span>CREATE THE TREND</span>
                </div>
                <p className="text-white text-center text-[16px] md:text-[20px] font-bold ">
                  Whether It&apos;s Social Media or Realty Websites, Fotober Makes Your Property Go
                  Viral and Stay on Top
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mt-10 md:mt-20">
                <Link href="https://orders.fotober.com/">
                  <ButtonBanner title="START NOW" />
                </Link>
                <ButtonBanner onClick={handleScroll} title=" BOOK A TRIAL" />
              </div>
            </div>
            <Image
              alt="Fotober viral property marketing for social media and realty websites"
              src={ImageBgHome3}
              width={1920}
              height={850}
              quality={70}
              loading="lazy"
              sizes="100vw"
              className="w-full h-[650px] md:h-[850px] object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute w-full h-full bg-[#00000085]" />
            <div className="absolute top-14 left-0  flex w-full h-full  flex-col justify-center items-center z-10">
              <div className="xl:h-[117px] xl:w-[1258px] flex flex-col gap-4 justify-center items-center">
                <div className="text-white text-[21px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-center font-bold uppercase">
                  <span>RECREATE YOUR VIRTUAL IMAGINATION </span>
                </div>
                <p className="text-white text-center text-[16px] md:text-[20px] font-bold ">
                  Make your dream house come to life in perfect for with Fotober&apos;s virtual
                  services
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mt-10 md:mt-20">
                <Link href="https://orders.fotober.com/">
                  <ButtonBanner title="START NOW" />
                </Link>
                <ButtonBanner onClick={handleScroll} title=" BOOK A TRIAL" />
              </div>
            </div>
            <Image
              alt="Fotober virtual imagination and dream house visualization services"
              src={ImageBgHome5}
              width={1920}
              height={850}
              quality={70}
              loading="lazy"
              sizes="100vw"
              className="w-full h-[650px] md:h-[850px] object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SessionBg
