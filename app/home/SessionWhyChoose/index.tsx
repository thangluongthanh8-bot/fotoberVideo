'use client'

import Fadein from '@/app/components/animations/Fadein'
import Button from '@/app/components/commons/Button'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import reasonableIcon from './assets/reson-price-icon.png'
import fastIcon from './assets/fast-diliver-icon.png'
import supportIcon from './assets/support-icon.png'
import iconLike from '@/app/assets/icons/like.png'
import iconLight2 from '@/app/assets/icons/light-2.png'
import iconStar from '@/app/assets/icons/star.png'
import iconEye from '@/app/assets/icons/eye.png'
import iconLight from '@/app/assets/icons/light.png'
import ServiceStepDescription from '@/app/components/ServiceStepDescription'

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
const listContentTop = [
  {
    icon: iconLike,
    title: 'Boost Engagement',
    description:
      "Slick, well-edited real estate videos catch viewers' attention, keeping potential buyers hooked and wanting more.\n",
  },
  {
    icon: iconLight2,
    title: 'Highlight Key \nFeatures',
    description:
      "Show off your property's best assets, like a gorgeous kitchen or stunning backyard, ensuring they steal the show.",
  },
  {
    icon: iconStar,
    title: 'Create Emotional \nConnections',
    description:
      'Add cool background music and seamless transitions to help buyers feel at home and picture themselves living there.',
  },
  {
    icon: iconEye,
    title: 'Professional \nAppeal',
    description:
      'High-quality, polished videos scream professionalism, building trust with buyers and showing your property in the best light.',
  },
  {
    icon: iconLight,
    title: 'Rock Your \nSocial Media',
    description:
      'Fast-paced reels are super shareable, boosting your property’s visibility and attracting more potential buyers.',
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
      <section data-testid=" " className='  m-auto px-4  container-custom'>
        <div className="mb-10 ">
          <h2 className="w-full text-wrap text-center uppercase font-montserrat text-[#043263] font-extrabold text-lg md:text-[23px] md:leading-[45px] my-0">
            Real Estate Video Editing
          </h2>
          <p className="text-base text-justify text-[#000] max-w-[800px] m-auto mt-1">
            At Fotober's Real Estate Video Editing Services, we turn raw footage into capturing
            property videos using techniques like advanced color correction for cinematic,
            natural, or modern tones, smooth transitions, and professional lighting adjustments.
          </p>
          <p className="text-base text-justify text-[#000] max-w-[800px] m-auto mt-1">
            Our team enhances key features with effects like motion tracking and stabilization,
            delivering visually stunning videos that elevate your property's appeal and engage
            potential buyers effectively.
          </p>
        </div>
      </section>
      <section data-testid="WHY CHOOSE US" className="flex flex-row justify-center items-center pt-10 pb-10">
        <div className="flex flex-row flex-wrap gap-5 items-start font-montserrat container-custom justify-around xl:justify-between ">
          <div className="w-[310px] md:w-[620px] max-lg:text-center lg:w-[270px] xl:w-[350px] 2xl:w-[415px]">
            <h2 className="text-[#043263] font-extrabold uppercase whitespace-nowrap text-[28px] mt-6">
              Why Choose Us
            </h2>
            <p className="text-base xl:text-theme-default pt-6 pb-6 sm:pt-4 sm:pb-4 text-justify">
              We understand that good listing videos are the cornerstone of the home-selling process. We help you quickly, easily, and inexpensively enhance photos and edit videos of your real estate listings.
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
      <section className=" m-auto px-4  container-custom" data-testid="show case">
        <h2 className="w-full text-wrap text-center uppercase font-montserrat text-[#043263] font-extrabold text-lg md:text-[23px] md:leading-[45px] my-0">
          Showcase Your Property in The Best Light
        </h2>
        <div
          data-test-id="list-description-service"
          className="flex flex-wrap gap-4 md:gap-6 mt-8 mb-8"
        >
          {listContentTop.map((item) => (
            <ServiceStepDescription
              key={item.title}
              description={item.description}
              title={item.title}
              imageIcon={item.icon}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default SessionWhyChoose
