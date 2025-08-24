'use client'

import React from 'react'
import { normalizeSrc } from '../../lib/utils'

export default function CustomVideo(
  props: React.VideoHTMLAttributes<HTMLVideoElement>
) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <video
        {...props}
        src={
          typeof props.src === 'string' ? normalizeSrc(props.src) : props.src
        }
        controls
        className="w-full h-auto"
      />
    </div>
  )
}
