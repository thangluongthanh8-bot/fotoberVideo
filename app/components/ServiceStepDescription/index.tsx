'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

function ServiceStepDescription({
    imageIcon,
    title,
    description,
    customCssTitle,
    wrapClassName,
}: {
    imageIcon: StaticImageData
    title: string
    description: string
    customCssTitle?: string
    wrapClassName?: string
}) {
    return (
        <div
            className={twMerge(
                'bg-[#043263] rounded-[16px] p-6 flex flex-col items-center text-center flex-1 min-w-[180px] transition-shadow duration-300 hover:shadow-xl',
                wrapClassName,
            )}
        >
            {/* Icon - fixed height */}
            <div className="h-[60px] w-[60px] flex items-center justify-center mb-4">
                <Image
                    alt={title}
                    src={imageIcon}
                    className="w-[50px] h-[50px] object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(160deg)' }}
                />
            </div>

            {/* Title - fixed height to align across cards */}
            <div className="h-[60px] flex items-center justify-center mb-2">
                <h3 className={twMerge(
                    'text-white font-bold text-[16px] md:text-[18px] whitespace-pre-line text-center',
                    customCssTitle
                )}>
                    {title}
                </h3>
            </div>

            {/* Description - grows to fill remaining space */}
            <p className="text-white text-[13px] md:text-[14px]  flex-1 text-justify inter-word break-all">
                {description}
            </p>
        </div>
    )
}

export default ServiceStepDescription
