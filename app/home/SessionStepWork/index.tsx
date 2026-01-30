'use client'

import Fadein from '@/app/components/animations/Fadein'
import LightSpeedInLeft from '@/app/components/animations/LightSpeedInLeft'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import React, { useState } from 'react'
import BgSession from './assets/bg-session.png'
import iconStep1 from './assets/step-1.png'
import iconStep2 from './assets/step-2.png'
import iconStep3 from './assets/step-3.png'
import iconStep4 from './assets/step-4.png'
import SlideVideo from './SlideVideo'

const listAction = [
  {
    title: 'Upload Files',
    icon: iconStep1,
    description:
      'Whether adding professional photos  or images you took yourself, use the easy upload feature to submit.',
  },
  {
    title: 'Fotober Editing',
    icon: iconStep2,
    description: 'Here is where the magic begins!',
  },
  {
    title: 'Quality Control',
    icon: iconStep3,
    description:
      'The outputs go through a strict quality control process carried out by our experts.',
  },
  {
    title: 'Get Them Delivered',
    icon: iconStep4,
    description:
      'Within 12 - 24 hours, your images and videos will arrive in your email. You can always submit for revision if needed.',
  },
]

function SessionStepWork() {
  const [itemHover, setItemHover] = useState<number | undefined>(undefined)
  return (
    <div className="w-full relative">
      <Image
        sizes="(max-width: 768px) 100vw"
        alt="fotober"
        src={BgSession}
        className="w-full h-full absolute z-1 object-cover"
      />
      <div className="bg-[#000000b8] absolute w-full h-full z-10" />
      <div className="relative flex flex-col justify-center items-center w-full text-center z-20 pt-8 max-md:px-4">
        <LightSpeedInLeft>
          <h2 className="text-center text-white text-[28px] font-extrabold pt-4">
            HOW DOES THIS WORK?
          </h2>
        </LightSpeedInLeft>
        <Fadein>
          <p className="md:text-[24px] text-[18px] text-white pt-4">
            Get High Quality Real Estate Images & Video in Just 4 Simple Steps
          </p>
        </Fadein>

        <div className="list-step max-lg:!hidden lg:flex  lg:flex-row container-custom pb-14 pt-10 relative">
          <div
            className={twMerge(
              'absolute max-md:hidden  bg-[#043263] z-10 top-[calc(calc(50%-3.15rem))] lg:top-[calc(calc(50%-26px))] xl:top-[calc(calc(50%-36px))] w-[0%] h-[12px] rounded-[5px] duration-[1000ms]',
              itemHover === 0 ? 'w-[25%]' : '',
              itemHover === 1 ? 'w-[50%]' : '',
              itemHover === 2 ? 'w-[75%]' : '',
              itemHover === 3 ? 'w-[100%]' : '',
            )}
          />
          {listAction.map((item, index) => {
            return (
              <div
                onMouseEnter={() => setItemHover(index)}
                onMouseLeave={() => setItemHover(undefined)}
                key={item.title}
                data-test-id="item-step"
                className={twMerge(
                  'items-center flex flex-col cursor-pointer w-[270px] lg:w-[245px] xl:w-[315px] xl:h-[300px]',
                )}
              >
                <Image
                  alt="fotober"
                  src={item.icon}
                  className={twMerge(
                    'md:w-[90px] md:h-[90px] w-[60px] h-[60px]',
                    itemHover === index ? 'bg-[#043263] rounded-full' : '',
                  )}
                />
                <div className="mt-8 w-full relative">
                  <div
                    className={twMerge(
                      'w-full h-[12px] bg-white',
                      index === 0 ? 'rounded-bl-[5px] rounded-tl-[5px]' : '',
                      index === 3 ? 'rounded-br-[5px] rounded-tr-[5px]' : '',
                    )}
                  />
                  <div className="w-[35px] z-20 h-[35px] bg-[#043263] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-solid border-[2px] border-[#FFF] font-extrabold flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                </div>
                <p className="text-[21px]  whitespace-nowrap text-white font-bold pt-6">
                  {item.title}
                </p>
                <Fadein>
                  <p
                    className={twMerge(
                      'text-theme-default lg:text-[15px] 2xl:text-theme-default text-justify text-align-last-center max-md:pt-4 text-white px-2 xl:px-6',
                      index === 1 ? 'lg:whitespace-nowrap' : '',
                    )}
                    style={{
                      textAlignLast: 'center',
                    }}
                  >
                    {item.description}
                  </p>
                </Fadein>
              </div>
            )
          })}
        </div>
        <div className="list-step-mobile flex flex-col lg:!hidden container-custom pb-14 pt-10 relative">
          {listAction.map((item, index) => {
            return (
              <div
                onMouseEnter={() => setItemHover(index)}
                onMouseLeave={() => setItemHover(undefined)}
                key={item.title}
                data-test-id="item-step"
                className={twMerge('items-center pt-4 flex flex-row gap-6 cursor-pointer')}
              >
                <div className="w-[100%] flex flex-col justify-center items-center">
                  <Image
                    alt="fotober"
                    src={item.icon}
                    className={twMerge(
                      'w-[45px] h-[45px]',
                      itemHover === index ? 'bg-[#043263] rounded-full' : '',
                    )}
                  />
                  <p className="text-[21px]  whitespace-nowrap text-white font-bold pt-4">
                    {item.title}
                  </p>
                  <p
                    className={twMerge(
                      'text-theme-default max-w-[450px] text-justify text-align-last-center max-md:pt-4 text-white px-2 xl:px-6',
                      index === 1 ? 'lg:whitespace-nowrap' : '',
                    )}
                    style={{
                      textAlignLast: 'center',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SessionStepWork
