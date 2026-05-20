import { notFound } from 'next/navigation'
import { baseUrl } from '../config'
import { formatDate } from '../utils/formatDate'
import { getPostFiles } from '../utils/utils'
import { getTripData } from '../utils/trip'
import { CustomMDX } from './mdx'
import { GitInfo } from './GitInfo'
import { TripPhotoGallery } from './TripPhotoGallery'
import { TripMapSection } from './TripMapSection'

export default async function TripPostPage({ slug }: { slug: string }) {
  const post = getPostFiles(['trip']).find((item) => item.slug === slug)

  if (!post) notFound()

  const tripData = await getTripData(slug)
  const hasMap =
    !!tripData?.center &&
    ((tripData?.points?.length || 0) > 0 ||
      (tripData?.route?.length || 0) > 1 ||
      tripData.photos.some((photo) => photo.latitude && photo.longitude))

  return (
    <section className="space-y-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.createdAt,
            dateModified: post.metadata.updatedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : undefined,
            url: `${baseUrl}/trip/${post.slug}`,
          }),
        }}
      />

      <header className="space-y-5">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {tripData?.region || 'Trip'}
          </p>
          <h1 className="title text-4xl font-semibold tracking-tighter">
            {post.metadata.title}
          </h1>
          {post.metadata.summary && (
            <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
              {post.metadata.summary}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span>发表于 {formatDate(post.metadata.createdAt, true)}</span>
          <span>最后更新于 {formatDate(post.metadata.updatedAt, true)}</span>
          {tripData?.startDate && <span>出发 {tripData.startDate}</span>}
          {tripData?.endDate && <span>结束 {tripData.endDate}</span>}
          {tripData?.country && <span>{tripData.country}</span>}
        </div>
      </header>

      {hasMap && tripData?.center && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">行程地图</h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              点位优先来自 sidecar 手动标注，照片如果保留了 EXIF GPS 也会自动落点。
            </p>
          </div>
          <TripMapSection
            center={tripData.center}
            zoom={tripData.zoom}
            points={tripData.points}
            route={tripData.route}
            photos={tripData.photos}
          />
        </section>
      )}

      {!!tripData?.photos?.length && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">照片</h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              当前是瀑布流相册布局，适合后续继续加更多照片和拍摄说明。
            </p>
          </div>
          <TripPhotoGallery photos={tripData.photos} />
        </section>
      )}

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      {post.gitInfo && (
        <GitInfo
          gitInfo={post.gitInfo}
          slug={post.slug}
          folder="trip"
          className="top-20"
        />
      )}
    </section>
  )
}
