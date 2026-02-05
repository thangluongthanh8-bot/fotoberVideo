import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { twMerge } from 'tailwind-merge'

function YoutubeEmbed({ iframeClassName, ...props }: YouTubeProps) {
  return (
    <YouTube
      {...props}
      iframeClassName={twMerge('w-full rounded-[.5rem] h-full', iframeClassName)}
      style={{ width: '100%' }}
    />
  )
}

export default YoutubeEmbed
