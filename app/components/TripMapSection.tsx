'use client'

import dynamic from 'next/dynamic'
import type { TripCoordinate, TripMapPoint, TripPhoto } from '../utils/trip'

const DynamicTripMap = dynamic(
  () => import('./TripMap').then((module) => module.TripMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] w-full animate-pulse rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900" />
    ),
  }
)

type TripMapSectionProps = {
  center: TripCoordinate
  zoom?: number
  points?: TripMapPoint[]
  route?: TripCoordinate[]
  photos?: TripPhoto[]
}

export function TripMapSection(props: TripMapSectionProps) {
  return <DynamicTripMap {...props} />
}
