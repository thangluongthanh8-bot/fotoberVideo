'use client'

import iconClose from '@/app/assets/icons/icon-close.png'
import iconOpen from '@/app/assets/icons/icon-expad.png'
import Image from 'next/image'
import React from 'react'

function ItemColab({
  titleColab,
  descriptionColab,
}: {
  titleColab: string
  descriptionColab: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-row items-center cursor-pointer gap-4 xl:min-h-[56px]"
        aria-hidden
        onClick={() => setIsOpen((cur) => !cur)}
      >
        <Image
          alt="fotober"
          src={isOpen ? iconClose : iconOpen}
          className="object-contain min-w-[24px] max-w-[24px] w-[24px] h-[24px] md:min-w-[35px] md:min-h-[35px] md:w-[35px] md:h-[35px]"
        />
        <h3 className="md:text-lg text-base font-bold text-[#003366] text-left">{titleColab}</h3>
      </div>
      {isOpen && (
        <div className="content pl-[50px] text-[14px] md:text-base w-[95%] text-justify ">
          {descriptionColab}
        </div>
      )}
      <div className="w-[100%] h-[2px] bg-[#8F8F8F] mt-2" />
    </div>
  )
}

export default ItemColab
