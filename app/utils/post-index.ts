export type ReadingPost = {
  folder: string
  slug: string
  metadata: { title?: string; createdAt: string }
}

export function publicationDate(post: ReadingPost) {
  const date = new Date(post.metadata.createdAt.replace(/^"|"$/g, ''))
  return Number.isNaN(date.getTime()) ? null : date
}

export function sortPosts(posts: ReadingPost[]) {
  return [...posts].sort(
    (a, b) =>
      (publicationDate(b)?.getTime() ?? 0) -
        (publicationDate(a)?.getTime() ?? 0) || a.slug.localeCompare(b.slug)
  )
}

export function dateParts(post: ReadingPost) {
  const date = publicationDate(post)
  if (!date) return null
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value || ''
  return {
    year: part('year'),
    month: part('month'),
    day: part('day'),
    iso: date.toISOString(),
  }
}
