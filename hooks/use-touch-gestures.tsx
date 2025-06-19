'use client'

import type React from 'react'

import { useCallback, useRef, useState } from 'react'

interface TouchGesturesProps {
  onPinch?: (scale: number) => void
  onPan?: (deltaX: number, deltaY: number) => void
  onDoubleTap?: () => void
}

export function useTouchGestures({
  onPinch,
  onPan,
  onDoubleTap,
}: TouchGesturesProps) {
  const [isGesturing, setIsGesturing] = useState(false)
  const lastTouchRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  )
  const initialDistanceRef = useRef<number>(0)
  const lastScaleRef = useRef<number>(1)

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touches = e.touches

      if (touches.length === 1) {
        // 单指触摸 - 记录位置和时间用于双击检测
        const touch = touches[0]
        const now = Date.now()

        if (lastTouchRef.current && now - lastTouchRef.current.time < 300) {
          const dx = Math.abs(touch.clientX - lastTouchRef.current.x)
          const dy = Math.abs(touch.clientY - lastTouchRef.current.y)

          if (dx < 50 && dy < 50) {
            onDoubleTap?.()
            lastTouchRef.current = null
            return
          }
        }

        lastTouchRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: now,
        }
      } else if (touches.length === 2) {
        // 双指触摸 - 记录初始距离
        setIsGesturing(true)
        initialDistanceRef.current = getDistance(touches[0], touches[1])
        lastScaleRef.current = 1
      }
    },
    [onDoubleTap]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      const touches = e.touches

      if (touches.length === 1 && !isGesturing) {
        // 单指拖拽
        const touch = touches[0]
        if (lastTouchRef.current) {
          const deltaX = touch.clientX - lastTouchRef.current.x
          const deltaY = touch.clientY - lastTouchRef.current.y
          onPan?.(deltaX, deltaY)

          lastTouchRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: lastTouchRef.current.time,
          }
        }
      } else if (touches.length === 2) {
        // 双指缩放
        const currentDistance = getDistance(touches[0], touches[1])
        const scale = currentDistance / initialDistanceRef.current

        if (Math.abs(scale - lastScaleRef.current) > 0.01) {
          onPinch?.(scale)
          lastScaleRef.current = scale
        }
      }
    },
    [isGesturing, onPan, onPinch]
  )

  const handleTouchEnd = useCallback(() => {
    setIsGesturing(false)
    initialDistanceRef.current = 0
    lastScaleRef.current = 1
  }, [])

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isGesturing,
  }
}
