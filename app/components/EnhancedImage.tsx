'use client'

import { useState, useEffect } from 'react'
import { Maximize2 } from 'lucide-react'
import { FullscreenViewer } from './FullscreenViewer'
import { useMobile } from '../../hooks/use-mobile'

interface EnhancedImageProps {
  src: string
  originSrc?: string // 可选的增强图片路径
  alt: string
  width?: number
  height?: number
  className?: string
  defaultName?: string
  enhancedName?: string
}

export function EnhancedImage({
  src,
  originSrc,
  alt,
  width = 800,
  height = 600,
  className = '',
  defaultName = '原图',
  enhancedName = '增强图',
}: EnhancedImageProps) {
  const btnClassNames = `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9
        rounded-md px-3 text-white border-none `
  const isMobile = useMobile()
  const [showOriginal, setShowOriginal] = useState(false)

  // 优化路径处理逻辑，避免重复代码
  function normalizeSrc(path: string) {
    if (!path) return path
    // ? 匹配前面的子表达式零次或一次
    // * 匹配前面的子表达式零次或多次 
    // + 匹配前面的子表达式一次或多次
    return path.replace(/^((\.\.\/)+|\/)public\/static/, '/static')
  }

  src = normalizeSrc(src)
  if (originSrc) {
    originSrc = normalizeSrc(originSrc)
  }

  // 判断是否有原图和增强图切换功能
  const hasSwitch = !!originSrc
  const originalImage = originSrc || src
  const enhancedImage = src

  const currentSrc = hasSwitch
    ? showOriginal
      ? originalImage
      : enhancedImage
    : src

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  useEffect(() => {
    return () => {
      if (isFullscreen) {
        setIsFullscreen(false)
      }
    }
  }, [isFullscreen])

  const handleTouchStart = () => {
    if (isMobile && !showControls && hasSwitch) {
      setShowControls(true)
      setTimeout(() => setShowControls(false), 3000)
    }
  }

  // 没有切换功能，直接显示图片
  if (!hasSwitch) {
    return (
      <span className="relative inline-block group">
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-lg ${className}`}
          onTouchStart={handleTouchStart}
          onClick={() => setIsFullscreen(true)}
        />

        {/* 桌面端全屏按钮 */}
        {!isMobile && (
          <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsFullscreen(true)}
              className={
                btnClassNames +
                'bg-black/50 hover:bg-black/70 text-white border-none ml-1'
              }
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </span>
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
      </span>
    )
  }

  // 有切换功能
  return (
    <span
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
        <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
        </span>
      )}

      {/* 移动端控制按钮 */}
      {isMobile && showControls && (
        <span className="absolute top-2 right-2 flex space-x-1">
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
              'bg-black/50 hover:bg-black/70 text-white border-none'
            }
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </span>
      )}

      {/* 移动端状态指示器 */}
      {isMobile && (showControls || showOriginal) && (
        <span className="absolute bottom-2 left-2">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {showOriginal ? defaultName : enhancedName}
          </span>
        </span>
      )}

      {/* 桌面端状态指示器 */}
      {!isMobile && (
        <span className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {showOriginal ? defaultName : enhancedName}
          </span>
        </span>
      )}

      {isFullscreen && (
        <FullscreenViewer
          src={originalImage}
          enhancedSrc={enhancedImage}
          alt={alt}
          hasEnhanced={true}
          defaultName={defaultName}
          enhancedName={enhancedName}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </span>
  )
}
