import Link from 'next/link'
import { notFound } from 'next/navigation'
import { metadataBase } from './metadataBase'
import { siteTitle } from '../config'
import { getPostFiles } from '../utils/utils'
import { formatDate } from '../utils/formatDate'
import { getTripData, normalizeAssetSrc } from '../utils/trip'

export function generateTripListMetadata() {
  return {
    ...metadataBase,
    title: 'Trip - ' + siteTitle,
    description: '记录游记、路线和照片。',
  }
}

export default async function TripListPage() {
  const list = getPostFiles(['trip']).sort((a, b) => {
    if (new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)) {
      return -1
    }
    return 1
  })

  if (list.length === 0) notFound()

  const cards = await Promise.all(
    list.map(async (post) => {
      const tripData = await getTripData(post.slug)
      const cover = normalizeAssetSrc(
        post.metadata.image ||
          tripData?.photos.find((photo) => photo.featured)?.src ||
          tripData?.photos[0]?.src ||
          ''
      )

      return {
        post,
        cover,
        tripData,
      }
    })
  )

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tighter">Trip</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          游记、照片和地图放在同一个栏目里，正文负责叙事，sidecar 数据负责路线与点位。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map(({ post, cover, tripData }) => (
          <Link
            key={post.slug}
            href={`/trip/${post.slug}`}
            className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
          >
            {cover ? (
              <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={cover}
                  alt={post.metadata.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-neutral-100 text-sm text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                暂无封面
              </div>
            )}
            <div className="space-y-3 p-5">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                  {tripData?.region || 'Trip Note'}
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  {post.metadata.title}
                </h2>
                {post.metadata.summary && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {post.metadata.summary}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{formatDate(post.metadata.createdAt, false)}</span>
                {tripData?.startDate && <span>{tripData.startDate}</span>}
                {tripData?.endDate && <span>至 {tripData.endDate}</span>}
                {!!tripData?.photos?.length && <span>{tripData.photos.length} 张照片</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
