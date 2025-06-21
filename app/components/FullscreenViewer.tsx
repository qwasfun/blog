'use client'

import type React from 'react'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { useMobile } from '../../hooks/use-mobile'
import { useTouchGestures } from '../../hooks/use-touch-gestures'

interface FullscreenViewerProps {
  src: string
  enhancedSrc: string
  alt: string
  defaultName?: string
  enhancedName?: string
  hasEnhanced: boolean
  onClose: () => void
}

export function FullscreenViewer({
  src,
  enhancedSrc,
  alt,
  hasEnhanced,
  defaultName = '原图',
  enhancedName = '修饰图',
  onClose,
}: FullscreenViewerProps) {
  const btnClassNames = `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9
        rounded-md px-3 text-white border-none `
  const [showOriginal, setShowOriginal] = useState(false)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const isMobile = useMobile()

  const currentSrc = hasEnhanced ? (showOriginal ? src : enhancedSrc) : src

  // 触摸手势处理
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchGestures({
      onPinch: (gestureScale) => {
        setScale((prev) => Math.max(0.1, Math.min(5, prev * gestureScale)))
      },
      onPan: (deltaX, deltaY) => {
        if (scale > 1) {
          setPosition((prev) => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY,
          }))
        }
      },
      onDoubleTap: () => {
        if (scale === 1) {
          setScale(2)
        } else {
          setScale(1)
          setPosition({ x: 0, y: 0 })
        }
      },
    })

  // 键盘事件处理
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case ' ':
        case 'Enter':
          if (hasEnhanced) {
            setShowOriginal(!showOriginal)
          }
          e.preventDefault()
          break
        case '+':
        case '=':
          setScale((prev) => Math.min(prev * 1.2, 5))
          e.preventDefault()
          break
        case '-':
          setScale((prev) => Math.max(prev / 1.2, 0.1))
          e.preventDefault()
          break
        case '0':
          setScale(1)
          setPosition({ x: 0, y: 0 })
          setRotation(0)
          e.preventDefault()
          break
        case 'r':
        case 'R':
          setRotation((prev) => (prev + 90) % 360)
          e.preventDefault()
          break
      }
    },
    [onClose, hasEnhanced, showOriginal]
  )

  // 鼠标滚轮缩放
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale((prev) => Math.max(0.1, Math.min(5, prev * delta)))
  }, [])

  // 拖拽功能
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && scale > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart, scale]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('keydown', handleKeyPress)
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    document.body.style.overflow = 'hidden'

    return () => {
      if (!isMobile) {
        document.removeEventListener('keydown', handleKeyPress)
        document.removeEventListener('wheel', handleWheel)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      document.body.style.overflow = 'unset'
    }
  }, [handleWheel, handleMouseMove, handleMouseUp, isMobile])

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* 桌面端工具栏 */}
      {!isMobile && (
        <div className="absolute top-4 left-4 right-4 flex justify-end items-center z-10">
          <div className="flex items-center space-x-2">
            {hasEnhanced && (
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className={
                  btnClassNames +
                  'bg-white/10 hover:bg-white/20 text-white border-none'
                }
              >
                {showOriginal ? (
                  <>查看{enhancedName}</>
                ) : (
                  <>查看{defaultName}</>
                )}
              </button>
            )}

            <button
              onClick={() => setScale((prev) => Math.max(prev / 1.2, 0.1))}
              className={
                btnClassNames +
                'bg-white/10 hover:bg-white/20 text-white border-none'
              }
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-white text-sm min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale((prev) => Math.min(prev * 1.2, 5))}
              className={
                btnClassNames +
                'bg-white/10 hover:bg-white/20 text-white border-none'
              }
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className={
                btnClassNames +
                'bg-white/10 hover:bg-white/20 text-white border-none'
              }
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className={
                btnClassNames +
                'bg-white/10 hover:bg-white/20 text-white border-none'
              }
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 移动端工具栏 */}
      {isMobile && (
        <>
          {/* 顶部工具栏 */}
          <div className="absolute top-4 left-4 right-4 flex justify-end items-center z-10">
            {hasEnhanced && (
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className={
                  btnClassNames + 'bg-zinc-800 text-white border-none mr-1'
                }
              >
                {showOriginal ? (
                  <>查看{enhancedName}</>
                ) : (
                  <>查看{defaultName}</>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className={btnClassNames + 'bg-zinc-800 text-white border-none'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 底部缩放控制 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 rounded-full px-4 py-2 z-10 flex items-center space-x-3">
            <button
              onClick={() => setScale((prev) => Math.max(prev / 1.2, 0.1))}
              className={btnClassNames + 'bg-zinc-800 text-white p-2'}
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-white text-sm min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale((prev) => Math.min(prev * 1.2, 5))}
              className={btnClassNames + 'bg-zinc-800 text-white p-2'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* 主图片区域 */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onMouseDown={!isMobile ? handleMouseDown : undefined}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        style={{
          cursor:
            !isMobile && scale > 1
              ? isDragging
                ? 'grabbing'
                : 'grab'
              : 'default',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <img
            ref={imageRef}
            src={currentSrc || '/placeholder.svg'}
            alt={alt}
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      </div>

      {/* 桌面端键盘快捷键提示 */}
      {!isMobile && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
          <div className="flex items-center space-x-4 text-xs">
            <span>ESC: 关闭</span>
            <span>空格: 切换</span>
            <span>+/-: 缩放</span>
            <span>0: 重置</span>
            <span>R: 旋转</span>
            <span>滚轮: 缩放</span>
          </div>
        </div>
      )}

      {/* 移动端手势提示 */}
      {isMobile && scale === 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
          双击缩放 · 双指缩放 · 拖拽移动
        </div>
      )}
    </div>
  )
}
