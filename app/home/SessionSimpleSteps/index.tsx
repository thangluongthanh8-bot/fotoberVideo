'use client'

import Fadein from '@/app/components/animations/Fadein'
import Image from 'next/image'
import React from 'react'
import imageBanner from './assets/11231@2x.jpg'

function SessionSimpleSteps() {
  return (
      <div className="w-full flex flex-col md:flex-row items-center font-montserrat justify-center px-1">
        <div className="container-custom w-full flex flex-col">
          <div className="flex  max-lg:flex-col-reverse lg:flex-row">
            <div className="w-[90%]">
              <Image
                alt="fotober"
                src={imageBanner}
                unoptimized={true}
                className="w-full object-contain max-w-[735px]"
              />
            </div>
            <div className="mt-2 lg:mt-10">
              <Fadein>
                <p className="text-[#043263] text-[28px] max-lg:text-center font-bold">
                  Interact easily and directly with your editing team!
                </p>
              </Fadein>
              <Fadein>
                <p className="text-base mt-4 max-lg:text-center">
                  Team talk allows you to live chat and keep track of your real estate photo editing
                  status at your fingertips.
                </p>
              </Fadein>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SessionSimpleSteps
