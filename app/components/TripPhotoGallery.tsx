import { EnhancedImage } from './EnhancedImage'
import type { TripPhoto } from '../utils/trip'

export function TripPhotoGallery({ photos }: { photos: TripPhoto[] }) {
  if (!photos.length) {
    return null
  }

  return (
    <div className="columns-1 gap-4 sm:columns-2">
      {photos.map((photo) => (
        <figure
          key={photo.publicSrc}
          className="mb-4 break-inside-avoid rounded-3xl border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-950"
        >
          <EnhancedImage
            src={photo.publicSrc}
            alt={photo.alt}
            width={photo.width || 1200}
            height={photo.height || 900}
            className="h-auto w-full rounded-2xl object-cover"
          />
          {(photo.caption || photo.takenAt) && (
            <figcaption className="px-2 pb-1 pt-3 text-sm text-neutral-600 dark:text-neutral-400">
              {photo.caption || photo.takenAt}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
