'use client'
import React from 'react'
interface TabItemProps {
  label: string
  children: React.ReactNode
}
export const Tabs = ({ children }) => {
  const [active, setActive] = React.useState(0)
  const tabs = React.Children.toArray(children).filter(Boolean)

  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex space-x-2 border-b border-gray-200 px-2 pt-2 dark:border-gray-700">
        {tabs.map((tab, idx) => {
          const label = React.isValidElement(tab) ? (tab as React.ReactElement<TabItemProps>).props.label : ''
          return (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`px-3 py-1.5 rounded-t-lg text-sm font-medium transition-colors
                ${active === idx
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-x border-t border-gray-200 dark:border-gray-700'
                  : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
                }`}
              style={{ outline: 'none' }}
              type="button"
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="p-4">{tabs[active]}</div>
    </div>
  )
}

export const TabItem = ({ children }: TabItemProps) => {
  return <div className="tab-content">{children}</div>
}
