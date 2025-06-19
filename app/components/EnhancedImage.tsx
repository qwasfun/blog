'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'

interface EnhancedImageProps {
  src: string
  enhancedSrc?: string // 可选的修饰图片路径
  alt: string
  width?: number
  height?: number
  className?: string
  defaultName?: string
  enhancedName?: string
}

export function EnhancedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  defaultName = '原图',
  enhancedName = '修饰图',
  enhancedSrc,
}: EnhancedImageProps) {
  const [showOriginal, setShowOriginal] = useState(false)

  const currentSrc = showOriginal ? src : enhancedSrc

  // 如果没有修饰版本，直接显示原图
  if (!enhancedSrc) {
    return (
      <div className="relative inline-block">
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-lg ${className}`}
        />
      </div>
    )
  }

  return (
    <div className="relative inline-block group">
      <img
        src={currentSrc || '/placeholder.svg'}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg transition-all duration-300 ${className}`}
      />

      {/* 切换按钮 */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background
            transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9
            rounded-md px-3 bg-black/50 hover:bg-black/70 text-white border-none"
        >
          {showOriginal ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" />
              {`显示${enhancedName}`}
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" />
              {`显示${defaultName}`}
            </>
          )}
        </button>
      </div>

      {/* 图片状态指示器 */}
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
          {showOriginal ? defaultName : enhancedName}
        </span>
      </div>
    </div>
  )
}
