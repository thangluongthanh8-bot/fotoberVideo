'use client'

import YoutubeEmbed from '@/app/components/YoutubeEmbed'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const videoEditingMore = [
    {
        title: 'Walkthrough Video Editing',
        videoThumbId: 'tonovqKHhFA',
        description:
            "Transform your property tours into immersive visual experiences. Our walkthrough video editing services enhance every detail, ensuring potential buyers feel like they're stepping right into the property. Highlight features, optimize flow, and captivate your audience with professional, polished videos.",
    },
    {
        title: 'Personal Branding Video Editing',
        videoThumbId: 'PNUHVgYM0hM',
        description:
            'Develop your brand with our video editing services. Put a face and voice to your name, establish trust, and connect with your prospects on a personal level. Our professionals help you build a strong personal brand, making your real estate videos more engaging and effective in closing deals faster.',
    },
    {
        title: 'Drone Video Editing',
        videoThumbId: 'aPrOunkrJNY',
        description:
            'Send us your raw aerial footage, and watch us turn it into a real estate marketing masterpiece. Our drone video editors expertly stitch and enhance your footage, showcasing your property from stunning angles that captivate and inspire potential buyers.',
    },
    {
        title: 'Special Effects',
        videoThumbId: 'nSgYdBAnSKI',
        description:
            'Make your real estate videos stand out with our special effects services. From eye-catching transitions to dynamic animations, our editors add the perfect finishing touches that elevate your property presentations and leave a lasting impression.',
    },
]

function SessionServiceChild() {
    return (
        <div className="flex flex-row flex-wrap justify-between items-start mt-8 gap-6 mb-12">
            {videoEditingMore?.map((item, index) => (
                <div
                    key={item.title}
                    className="flex flex-row w-full md:w-[47%] items-center justify-between relative"
                >
                    <div className="w-full flex flex-col gap-2">
                        <h4 className="font-montserrat text-[#043263] text-base lg:text-lg 2xl:text-xl font-bold xl:whitespace-nowrap my-0">
                            {index + 1}. {item.title}
                        </h4>
                        <p className="w-full xl:min-h-[100px] font-montserrat text-[#043263] text-base text-justify">
                            {item.description}
                        </p>
                        <YoutubeEmbed
                            videoId={item?.videoThumbId}
                            className={twMerge(
                                'w-full h-[250px] 2xl:h-[385px] rounded-tl-[12px] rounded-tr-[12px] object-cover overflow-hidden',
                            )}
                            title="fotober"
                            opts={{
                                playerVars: {
                                    autoplay: 0,
                                    controls: 1,
                                    modestbranding: 1,
                                    rel: 0,
                                },
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SessionServiceChild
