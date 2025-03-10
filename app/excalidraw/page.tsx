'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import '@excalidraw/excalidraw/index.css'

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
)

const Page = ({ searchParams }) => {
  const { f = 'show.excalidraw' } = searchParams
  const [excalidrawAPI, setExcalidrawAPI] = React.useState<any>(null)
  const [isViewMode, setIsViewMode] = useState(true)

  useEffect(() => {
    const loadExcalidrawFile = async () => {
      try {
        const response = await fetch(`/excalidraw/${f}`)
        const data = await response.json()

        if (excalidrawAPI) {
          excalidrawAPI.updateScene({
            elements: data.elements,
            appState: {
              ...data.appState,
              viewBackgroundColor:
                data.appState.viewBackgroundColor || '#ffffff',
            },
            files: data.files,
          })
          excalidrawAPI.scrollToContent(excalidrawAPI.getSceneElements(), {
            fitToContent: true,
          })
        }
      } catch (error) {
        console.log('loadExcalidrawFile error: ', error)
      }
    }

    loadExcalidrawFile()
  }, [excalidrawAPI])

  return (
    <>
      <div style={{ width: '100%', height: '600px' }} className="border-1">
        <Excalidraw
          viewModeEnabled={isViewMode}
          langCode="zh-CN"
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      </div>
      <div className="flex mx-auto">
        <button
          className="rounded-4xl bg-black px-3.5 py-1.25 my-2 text-[0.8125rem]/6 text-center font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => setIsViewMode(!isViewMode)}
        >
          {isViewMode ? '编辑模式' : '查看模式'}
        </button>
      </div>
    </>
  )
}

export default Page
