'use client'

import Fadein from '@/app/components/animations/Fadein'
import LightSpeedInLeft from '@/app/components/animations/LightSpeedInLeft'
import iconNext from '@/app/home/SessionClients/assets/next.png'
import iconPrev from '@/app/home/SessionClients/assets/prev.png'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
interface TestimonialItem {
  image: string | StaticImageData
  title: string
  comment: string
  service: string
}

interface SessionUnderConsiderationProps {
  data: TestimonialItem[]
}

const Star: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="81" height="16" viewBox="0 0 71 13" fill="none">
      <path
        d="M9.64697 12.0322L5.97498 10.1729L2.36206 12.146L2.99402 8.07812L0.00305176 5.25098L4.06604 4.59619L5.82996 0.876953L7.70898 4.54004L11.791 5.06787L8.88904 7.98584L9.64697 12.0322Z"
        fill="#febe1f"
      />
      <path
        d="M24.212 12.0322L20.5389 10.1729L16.926 12.146L17.559 8.07812L14.567 5.25098L18.631 4.59619L20.395 0.876953L22.274 4.54004L26.356 5.06787L23.453 7.98584L24.212 12.0322Z"
        fill="#febe1f"
      />
      <path
        d="M38.776 12.0322L35.104 10.1729L31.49 12.146L32.123 8.07812L29.131 5.25098L33.1949 4.59619L34.959 0.876953L36.838 4.54004L40.92 5.06787L38.017 7.98584L38.776 12.322Z"
        fill="#febe1f"
      />
      <path
        d="M53.3409 12.0322L49.668 10.1729L46.0551 12.146L46.688 8.07812L43.696 5.25098L47.759 4.59619L49.524 0.876953L51.402 4.54004L55.484 5.06787L52.582 7.98584L53.3409 12.0322Z"
        fill="#febe1f"
      />
      <path
        d="M67.905 12.0322L64.2321 10.1729L60.619 12.146L61.252 8.07812L58.26 5.25098L62.324 4.59619L64.088 0.876953L65.967 4.54004L70.049 5.06787L67.146 7.98584L67.905 12.0322Z"
        fill="#febe1f"
      />
    </svg>
  )
}

const SessionUnderConsiderationWithMockContent: React.FC<SessionUnderConsiderationProps> = ({
  data,
}) => {

  return (
    <div className="flex flex-col container-custom  m-auto gap-4 2xl:gap-8 font-montserrat justify-center mb-5">
      <div className="flex flex-col lg:flex-col gap-[50px] justify-center items-center w-full">
        <div className="xl:w-[55%] w-ful">
          <LightSpeedInLeft>
            <h2 className="text-[#043263] text-center   md:text-[28px]  font-extrabold m-[24px]">
              CUSTOMER TESTIMONIAL
            </h2>
          </LightSpeedInLeft>
          {/* <p className="text-[#1A1A1A] max-lg:text-center text-xl md:text-[28px] md:leading-[34px] font-bold py-4">
              Let’s Check Our <br /> Customer Testimonial
            </p> */}
          <Fadein>
            <p className="text-base text-[#043263] md:text-theme-default  text-[20px] text-center xl:pr-[20px] font-bold">
              Let see reviews from our customers are evidence of their satisfaction and our
              expertise in professional real estate photo and video editing.
            </p>
          </Fadein>
        </div>
        <div className=" w-full xl:w-full max-xl:mt-6 flex flex-row items-center justify-center relative">
          <div className="m-4 swiper-button-prev-consideration cursor-pointer overflow-hidden relative z-20 min-w-[24px]">
            <Image alt="swiper" src={iconPrev} className="min-w-[24px] w-[24px] h-[24px]" />
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="flex-1 min-w-0 list-card-slide-shadow-center slide-consideration !pb-4"
            navigation={{
              nextEl: '.swiper-button-next-consideration',
              prevEl: '.swiper-button-prev-consideration',
            }}
          >
            {data?.map((item, index) => (
              <SwiperSlide
                key={item.title}
                className="!h-auto "
              >
                <div className="item-testimonial-1 relative z-10 bg-[#043263] rounded-[25px] gap-4 justify-between flex flex-col w-full p-6 h-full text-left items-start">
                  <div className="info w-full text-white">
                    <Star />
                    <p className="overflow-hidden text-sm md:text-base pt-3 leading-relaxed text-justify">
                      {item.comment}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-[50px] h-[50px] min-w-[50px]">
                      <Image
                        alt={item.title}
                        priority
                        src={item.image}
                        fill
                        className="object-cover rounded-full !border-[2px] !border-solid !border-white"
                      />
                    </div>
                    <div className="info-client">
                      <p className="info w-full text-[#febe1f] font-bold text-lg">{item.title}</p>
                      <p className="text-xs text-white w-max">{item.service}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next-consideration cursor-pointer z-20 min-w-[24px] m-4">
            <Image alt="swiper" src={iconNext} className="min-w-[24px] w-[24px] h-[24px]" />
          </div>
          <div className="z-[-1] bg-[#EDEDED] left-[32px] max-md:right-[32px] w-[85%] bottom-0 h-[100px] lg:h-[300px] absolute z-1 lg:w-full flex justify-start items-center " />
        </div>
      </div>
    </div>
  )
}

export default SessionUnderConsiderationWithMockContent
