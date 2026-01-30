'use client'

import Fadein from '@/app/components/animations/Fadein'
import Image from 'next/image'
import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import logo1 from './assets/logo-1.png'
import logo2 from './assets/logo-2.png'
import logo3 from './assets/logo-3.png'
import logo4 from './assets/logo-4.png'
import logo5 from './assets/logo-5.png'
import logo6 from './assets/logo-6.png'
import logo7 from './assets/logo-7.png'
import logo8 from './assets/kigo-1.png'

const listLogo = [
  {
    nameCompany: 'aa',
    logo: logo1,
  },
  {
    nameCompany: 'bb',
    logo: logo2,
  },
  {
    nameCompany: 'logo3',
    logo: logo3,
  },
  {
    nameCompany: 'logo4',
    logo: logo4,
  },
  {
    nameCompany: 'logo5',
    logo: logo5,
  },
  {
    nameCompany: 'logo6',
    logo: logo6,
  },
  {
    nameCompany: 'logo7',
    logo: logo7,
  },
  {
    nameCompany: 'logo8',
    logo: logo8,
  },
]

function SessionClients() {
  return (
    <div className="flex justify-center flex-col items-center ">
      <Fadein>
        <h2 className="text-center text-[#043263] pb-10 text-[28px] font-extrabold">
          TRUSTED BY THE BEST!
        </h2>
      </Fadein>
      <div className="relative container-custom flex justify-center items-center">
        <div className="w-full max-2xl:px-8 max-w-[1160px] relative">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            slidesPerView="auto"
            allowTouchMove
            loopAddBlankSlides={false}
            centeredSlides
            spaceBetween={30}
            className="w-full"
          >
            {listLogo.map(({ nameCompany, logo }) => (
              <SwiperSlide
                key={nameCompany}
                className="border-solid !flex border-[3px] border-[#043263] rounded-[17px] lg:rounded-[31px] !h-[80px] !w-[150px] max-w-[150px] md:!w-[200px] md:max-w-[200px] md:!h-[110px]  items-center justify-center p-6"
              >
                <Image
                  alt={nameCompany}
                  src={logo}
                  className="w-full max-h-[50px] object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SessionClients
