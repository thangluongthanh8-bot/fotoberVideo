'use client'

import React, { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import arrowRight from './assets/arrow-right.png'
import arrowRightHover from './assets/arow-right-hover.png'

interface CustomButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string
  loading?: boolean
  showArrow?: boolean
  colorArrow?: string
  descriptionTitle?: string
  wrapClassName?: string
}

function Button({
  title,
  showArrow,
  loading,
  colorArrow,
  descriptionTitle,
  wrapClassName,
  disabled,
  ...props
}: CustomButtonProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const baseClass =
    'group border-solid border-[1px] transition-all duration-500 w-fit flex flex-row items-center gap-2 px-6 justify-center p-2 rounded-[12px] mt-8 font-semibold'

  const activeClass =
    'cursor-pointer bg-[#043263] text-white hover:border-[#043263] hover:bg-white hover:text-[#043263]'

  const disabledClass = 'cursor-not-allowed bg-gray-400 text-gray-200 border-gray-400'
  const arrowIcon =
    colorArrow === 'arow-right-hover'
      ? isHover
        ? arrowRight
        : arrowRightHover
      : isHover
        ? arrowRightHover
        : arrowRight

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={twMerge(baseClass, disabled ? disabledClass : activeClass, wrapClassName)}
      {...props}
    >
      {loading ? (
        <div className="lds-ellipsis text-white gap-3">
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <>
          <div className="text-[15px] 2xl:text-[18px] font-semibold ">
            <p>{title}</p>
            {descriptionTitle && <p className="text-[9px]">{descriptionTitle}</p>}
          </div>
          {showArrow && (
            <Image
              alt="fotober"
              // src={isHover ? arrowRightHover : arrowRight}
              src={arrowIcon}
              className="w-[24px] ml-1  "
            />
          )}
        </>
      )}
    </button>
  )
}

export default Button
