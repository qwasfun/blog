'use client'

import { useState, useEffect } from 'react'
import { Maximize2 } from 'lucide-react'
import { FullscreenViewer } from './FullscreenViewer'
import { useMobile } from '../../hooks/use-mobile'

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
  const btnClassNames = `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9
        rounded-md px-3 text-white border-none `
  const isMobile = useMobile()
  const [showOriginal, setShowOriginal] = useState(false)

  const currentSrc = showOriginal ? src : enhancedSrc

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  useEffect(() => {
    // 在组件卸载时清理全屏状态
    return () => {
      if (isFullscreen) {
        setIsFullscreen(false)
      }
    }
  }, [isFullscreen])

  // 移动端长按显示控制按钮
  const handleTouchStart = () => {
    if (isMobile && !showControls) {
      setShowControls(true)
      setTimeout(() => setShowControls(false), 3000)
    }
  }

  // 如果没有修饰版本，直接显示原图
  if (!enhancedSrc) {
    return (
      <div className="relative inline-block group">
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-lg ${className}`}
          onTouchStart={handleTouchStart}
          onClick={() => setIsFullscreen(true)}
        />

        {/* 移动端全屏按钮 */}
        {!isMobile && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsFullscreen(true)}
              className={
                btnClassNames +
                'bg-black/50 hover:bg-black/70 text-white border-none ml-1'
              }
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {isFullscreen && (
          <FullscreenViewer
            src={src}
            enhancedSrc={src}
            alt={alt}
            hasEnhanced={false}
            onClose={() => setIsFullscreen(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className="relative inline-block group"
      onTouchStart={handleTouchStart}
    >
      <img
        src={currentSrc || '/placeholder.svg'}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg transition-all duration-300 ${className}`}
        onClick={() => setIsFullscreen(true)}
      />

      {/* 桌面端悬停控制按钮 */}
      {!isMobile && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={
              btnClassNames +
              'bg-black/50 hover:bg-black/70 text-white border-none'
            }
          >
            {showOriginal ? <>查看{enhancedName}</> : <>查看{defaultName}</>}
          </button>
          <button
            onClick={() => setIsFullscreen(true)}
            className={
              btnClassNames +
              'bg-black/50 hover:bg-black/70 text-white border-none ml-1'
            }
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 移动端控制按钮 */}
      {isMobile && (showControls || !enhancedSrc) && (
        <div className="absolute top-2 right-2 flex space-x-1">
          {enhancedSrc && (
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className={
                btnClassNames +
                'bg-black/50 hover:bg-black/70 text-white border-none'
              }
            >
              {showOriginal ? <>查看{enhancedName}</> : <>查看{defaultName}</>}
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(true)}
            className={
              btnClassNames +
              'bg-black/50 hover:bg-black/70 text-white border-none'
            }
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 移动端状态指示器 */}
      {isMobile && enhancedSrc && (showControls || showOriginal) && (
        <div className="absolute bottom-2 left-2">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {showOriginal ? defaultName : enhancedName}
          </span>
        </div>
      )}

      {/* 桌面端状态指示器 */}
      {!isMobile && (
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {showOriginal ? defaultName : enhancedName}
          </span>
        </div>
      )}

      {isFullscreen && (
        <FullscreenViewer
          src={src}
          enhancedSrc={enhancedSrc}
          alt={alt}
          hasEnhanced={!!enhancedSrc}
          defaultName={defaultName}
          enhancedName={enhancedName}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </div>
  )
}
