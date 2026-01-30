import Button from '@/app/components/commons/Button'
import LayoutMain from '@/app/components/layouts/main'
import ThankYouAnimation from '@/app/components/ThankYouAnimation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageThankYou from '@/app/assets/image-thank-you.webp'

function ThankYou() {
  return (
    <LayoutMain classHeader="bg-[#043263]">
      <div className="container-custom m-auto my-[6rem]">
        <div className="flex flex-col gap-2 justify-center items-center mb-4">
          <ThankYouAnimation />
          <div className="flex justify-center w-full rounded-[18px] overflow-hidden">
            <Image
              src={ImageThankYou}
              quality={100}
              alt="fotober"
              className="rounded-[18px] max-h-[450px] object-cover "
            />
          </div>
          <Link href="/">
            <div className="w-full md:w-[250px]">
              <Button title="Create new order" wrapClassName="mt-2 uppercase w-full md:w-[250px]" />
            </div>
          </Link>
        </div>
      </div>
    </LayoutMain>
  )
}

export default ThankYou
