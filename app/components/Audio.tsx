'use client'

import React from 'react'
import { normalizeSrc } from '../../lib/utils'

export default function CustomAudio(
  props: React.AudioHTMLAttributes<HTMLAudioElement>
) {
  return (
    <div className="p-2 border rounded-xl shadow-md bg-gray-50">
      <audio
        {...props}
        src={
          typeof props.src === 'string' ? normalizeSrc(props.src) : props.src
        }
        controls
        className="w-full"
      />
    </div>
  )
}
