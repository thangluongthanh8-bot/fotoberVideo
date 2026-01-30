'use client'

import Fadein from '@/app/components/animations/Fadein'
import Button from '@/app/components/commons/Button'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import reasonableIcon from './assets/reson-price-icon.png'
import fastIcon from './assets/fast-diliver-icon.png'
import supportIcon from './assets/support-icon.png'

const dataOption = [
  {
    title: 'Fast Delivery',
    icon: fastIcon,
    description: '12 hour turn around (24 hours for virtual staging)',
  },
  {
    title: 'Reasonable Price',
    icon: reasonableIcon,
    description: 'We guarantee unbeatable price for products of highest quality',
  },
  {
    title: 'Support 24/7',
    icon: supportIcon,
    description: 'Our customer service are available 24/7 ',
  },
]

function SessionWhyChoose() {
  const [indexHover, setIndexHover] = React.useState<number | undefined>(undefined)

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
    <div className="py-7 ">
      <section data-testid="WHY CHOOSE US" className="flex flex-row justify-center items-center">
        <div className="flex flex-row flex-wrap gap-5 items-start font-montserrat container-custom justify-around xl:justify-between ">
          <div className="w-[310px] md:w-[620px] max-lg:text-center lg:w-[270px] xl:w-[350px] 2xl:w-[415px]">
            <h2 className="text-[#043263] font-extrabold uppercase whitespace-nowrap text-[28px] mt-6">
              Why Choose Us
            </h2>
            <p className="text-base xl:text-theme-default pt-6 pb-6 sm:pt-4 sm:pb-4 text-justify">
              We understand that good listing imagery is the cornerstone of the home selling
              process. We help you quickly, easily, and inexpensively enhance photos, edit video,
              and virtually stage your real estate listings.
            </p>
            <div aria-hidden onClick={handleScroll} className="w-full md:w-[250px]">
              <Button title="Start free trial" wrapClassName="mt-2 uppercase w-full md:w-[250px] btn-bg-primary" />
            </div>
          </div>
          <div className="flex flex-row flex-wrap items-start justify-center xl:justify-between gap-4">
            {dataOption.map(({ title, description, icon }, index) => {
              return (
                <div
                  key={title}
                  onMouseEnter={() => setIndexHover(index)}
                  onMouseLeave={() => setIndexHover(undefined)}
                  className="flex flex-col  justify-center items-center gap-4 w-[200px] xl:w-[230px] 2xl:w-[250px]"
                >
                  {/* <div
                      className={twMerge(
                        'h-[70px] animate__animated  animate__infinite',
                        // indexHover === index ? 'animate__swing' : '',
                      )}
                    > */}
                  <Image alt="fotober" src={icon} className="w-[64px]" />
                  {/* </div> */}
                  <p className="text-[#043263] font-bold text-[21px]">{title}</p>
                  <Fadein>
                    <p className="text-base xl:text-theme-default text-center whitespace-pre-line">
                      {description}
                    </p>
                  </Fadein>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SessionWhyChoose
