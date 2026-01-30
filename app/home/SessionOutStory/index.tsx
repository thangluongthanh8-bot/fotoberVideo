'use client'

import Fadein from '@/app/components/animations/Fadein'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import LazyLoad from 'react-lazyload'
import imageCompany from './assets/image-company.webp'

function SessionOutStory() {
  return (
    <div className="bg-[#043263] pb-12 ">
      <div className="flex flex-col max-md:gap-6 md:flex-row justify-center items-center container-custom bg-[#043263] m-auto">
        <div className="flex flex-col xl:gap-1 w-full md:w-[50%] px-4 xl:pr-14">
          <h2 className="text-center md:text-left text-white pt-6 pb-4 text-[40px] font-extrabold">
            OUR STORY
          </h2>
          <Fadein>
            <p className="text-white text-justify text-base xl:text-theme-default pb-1">
              Founded in 2017 with a small team of just five editors, Fotober has grown into a global real estate media editing partner with over 200 skilled professionals. Based in Vietnam, we deliver high-quality photo, video, virtual staging, rendering, and floor plan solutions trusted by real estate businesses worldwide.


            </p>
          </Fadein>
          <Fadein delay={0.7}>
            <p className="text-white text-justify text-base xl:text-theme-default pb-1">
              At Fotober, every project is handled with precision, speed, and consistency, helping elevate property listings, strengthen brand presence, and drive better results.
            </p>
          </Fadein>
          {/* <Fadein delay={0.9}>
            <p className="text-white text-justify text-base xl:text-theme-default pb-1">
              When you outsource your real estate photo editing needs to Fotober, you can trust in
              our commitment to delivering exceptional final products that elevate your listings and
              impress potential buyers. Experience the Fotober difference today.
            </p>
          </Fadein> */}

          <Link href="/about-us" className="max-md:m-auto ">
            <div className="p-2 px-10 cursor-pointer hover:scale-[1.05] transition-all  text-[#043263] mt-4 rounded-[12px] font-semibold border-solid border-[1px] border-[#043263] w-fit btn-bg-primary">
              ALL ABOUT US
            </div>
          </Link>
        </div>
        <div className="md:w-[50%]">
          <Image
            alt="fotober"
            width={700}
            height={700}
            src={imageCompany}
            unoptimized={true}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default SessionOutStory
