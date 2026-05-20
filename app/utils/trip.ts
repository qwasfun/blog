import fs from 'fs'
import path from 'path'
import * as exifr from 'exifr'

export type TripCoordinate = [number, number]

export type TripMapPoint = {
  name: string
  latitude: number
  longitude: number
  description?: string
  date?: string
  photoSrc?: string
}

export type TripPhotoInput = {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  latitude?: number
  longitude?: number
  takenAt?: string
  featured?: boolean
}

export type TripDataFile = {
  summary?: string
  region?: string
  country?: string
  startDate?: string
  endDate?: string
  center?: TripCoordinate
  zoom?: number
  route?: TripCoordinate[]
  points?: TripMapPoint[]
  photos?: TripPhotoInput[]
}

export type TripPhoto = TripPhotoInput & {
  publicSrc: string
}

export type TripData = Omit<TripDataFile, 'photos'> & {
  center?: TripCoordinate
  photos: TripPhoto[]
}

const tripContentDir = path.join(process.cwd(), 'content', 'trip')

export function normalizeAssetSrc(src: string) {
  if (!src) return src

  return src.replace(/^((\.\.\/)+|\/)public\/static/, '/static')
}

function resolvePublicAssetPath(src: string) {
  const normalizedSrc = normalizeAssetSrc(src)

  if (normalizedSrc.startsWith('/static/')) {
    return path.join(process.cwd(), 'public', normalizedSrc.replace(/^\//, ''))
  }

  return ''
}

async function readPhotoCoordinates(src: string) {
  const absolutePath = resolvePublicAssetPath(src)

  if (!absolutePath || !fs.existsSync(absolutePath)) {
    return null
  }

  try {
    const gps = (await exifr.gps(absolutePath)) as
      | { latitude?: number; longitude?: number }
      | null

    if (!gps?.latitude || !gps?.longitude) {
      return null
    }

    return {
      latitude: gps.latitude,
      longitude: gps.longitude,
    }
  } catch {
    return null
  }
}

function inferCenter(data: TripDataFile, photos: TripPhoto[]): TripCoordinate | undefined {
  if (data.center?.length === 2) {
    return data.center
  }

  const firstPoint = data.points?.[0]
  if (firstPoint) {
    return [firstPoint.latitude, firstPoint.longitude]
  }

  const firstPhoto = photos.find((photo) => photo.latitude && photo.longitude)
  if (firstPhoto?.latitude && firstPhoto.longitude) {
    return [firstPhoto.latitude, firstPhoto.longitude]
  }

  const firstRoutePoint = data.route?.[0]
  if (firstRoutePoint?.length === 2) {
    return firstRoutePoint
  }

  return undefined
}

export async function getTripData(slug: string): Promise<TripData | null> {
  const filePath = path.join(tripContentDir, `${slug}.json`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw) as TripDataFile

  const photos = await Promise.all(
    (data.photos || []).map(async (photo) => {
      const exifCoordinates = await readPhotoCoordinates(photo.src)

      return {
        ...photo,
        publicSrc: normalizeAssetSrc(photo.src),
        latitude: photo.latitude ?? exifCoordinates?.latitude,
        longitude: photo.longitude ?? exifCoordinates?.longitude,
      }
    })
  )

  return {
    ...data,
    center: inferCenter(data, photos),
    photos,
  }
}
