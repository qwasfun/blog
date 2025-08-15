'use client'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Page() {
  const [trackingState, setTrackingState] = useState('0')

  useEffect(() => {
    const savedState = localStorage.getItem('umami.disabled') || '0'
    setTrackingState(savedState.toString())
  })

  const toggleUmamiDisabled = () => {
    const newState = trackingState == '0' ? '1' : '0'
    setTrackingState(newState.toString())
    localStorage.setItem('umami.disabled', newState.toString())

    toast.success(`分析功能已${newState === '1' ? '禁用' : '启用'}`)
  }

  return (
    <div>
      <Toaster />
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">设置</h1>
      <div className="flex">
        <input
          type="checkbox"
          checked={trackingState === '1'}
          onChange={toggleUmamiDisabled}
        />
        <div className="ml-2">禁用 umami 分析</div>
      </div>
    </div>
  )
}
