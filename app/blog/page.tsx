import { generateListMetadata } from 'app/components/GenericListPage'
import { EditorialPostList } from 'app/components/editorial-post-list'
import { getPostFiles } from 'app/utils/utils'
import { dateParts, ReadingPost, sortPosts } from 'app/utils/post-index'
import { notFound } from 'next/navigation'
import { folder } from './config'

export const metadata = generateListMetadata(folder)

export default function Page() {
  const posts = sortPosts(getPostFiles([folder]))
  if (!posts.length) notFound()
  const groups = new Map<string, ReadingPost[]>()
  for (const post of posts) {
    const year = dateParts(post)?.year || '日期待补充'
    groups.set(year, [...(groups.get(year) || []), post])
  }
  return (
    <section className="article-archive">
      <div className="archive-intro">
        <h1>文章</h1>
        <p>技术实践、工具笔记与日常记录。</p>
      </div>
      {Array.from(groups, ([year, articles]) => (
        <section
          className="archive-year"
          key={year}
          aria-labelledby={`year-${year}`}
        >
          <h2 id={`year-${year}`}>{year}</h2>
          <EditorialPostList posts={articles} archive />
        </section>
      ))}
    </section>
  )
}
