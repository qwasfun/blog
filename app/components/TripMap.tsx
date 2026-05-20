'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet'
import type { TripCoordinate, TripMapPoint, TripPhoto } from '../utils/trip'

const LeafletMapContainer = MapContainer as any
const LeafletTileLayer = TileLayer as any
const LeafletMarker = Marker as any
const LeafletPopup = Popup as any
const LeafletPolyline = Polyline as any

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type TripMapProps = {
  center: TripCoordinate
  zoom?: number
  points?: TripMapPoint[]
  route?: TripCoordinate[]
  photos?: TripPhoto[]
}

export function TripMap({
  center,
  zoom = 7,
  points = [],
  route = [],
  photos = [],
}: TripMapProps) {
  const photoMarkers = photos
    .filter((photo) => photo.latitude && photo.longitude)
    .map((photo) => ({
      id: photo.publicSrc,
      label: photo.alt,
      description: photo.caption,
      latitude: photo.latitude as number,
      longitude: photo.longitude as number,
      type: 'photo' as const,
    }))

  const pointMarkers = points.map((point) => ({
    id: `${point.name}-${point.latitude}-${point.longitude}`,
    label: point.name,
    description: point.description,
    latitude: point.latitude,
    longitude: point.longitude,
    type: 'point' as const,
  }))

  const markers = [...pointMarkers, ...photoMarkers]

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-[360px] w-full z-0"
      >
        <LeafletTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route.length > 1 && (
          <LeafletPolyline
            positions={route}
            pathOptions={{ color: '#2563eb', weight: 4 }}
          />
        )}
        {markers.map((marker) => (
          <LeafletMarker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={defaultIcon}
          >
            <LeafletPopup>
              <div className="space-y-1 text-sm">
                <div className="font-semibold">{marker.label}</div>
                <div className="text-neutral-600">
                  {marker.type === 'photo' ? '照片点位' : '行程点位'}
                </div>
                {marker.description && <div>{marker.description}</div>}
              </div>
            </LeafletPopup>
          </LeafletMarker>
        ))}
      </LeafletMapContainer>
    </div>
  )
}
