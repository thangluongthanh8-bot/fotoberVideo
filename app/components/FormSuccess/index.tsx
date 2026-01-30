'use client'

import Button from '@/app/components/commons/Button'
import React from 'react'
import dynamic from 'next/dynamic'
import animation from './assets/lotti-animation.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

function FormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="w-full h-full flex justify-center items-center my-auto flex-col">
      <div className="w-[150px]">
        <Lottie animationData={animation} loop={false} />
      </div>
      <p className="text-base text-center font-semibold mt-4">
        We have received your information and will contact you as soon as possible. Thank you.
      </p>
      <Button onClick={onReset} loading={false} type="button" title="More Services" showArrow />
    </div>
  )
}

export default FormSuccess
