'use client'

import animation from '@/app/assets/animation/thank-you.json'
import dynamic from 'next/dynamic'
import React from 'react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

function ThankYouAnimation() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[350px]">
        <Lottie animationData={animation} />
      </div>
      <h2 className="text-[#043263] font-bold text-base md:text-[21px] text-center">
        We have received your information and will contact you as soon as possible. Thank you!
      </h2>
    </div>
  )
}
export default ThankYouAnimation
