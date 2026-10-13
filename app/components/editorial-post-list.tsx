import Link from 'next/link'
import { dateParts, ReadingPost } from '../utils/post-index'

const sectionLabels = {
  blog: '技术笔记',
  changelog: '博客建设',
  travel: '旅行记录',
}

export function EditorialPostList({
  posts,
  archive = false,
}: {
  posts: ReadingPost[]
  archive?: boolean
}) {
  return (
    <ul className={`editorial-post-list${archive ? ' archive-post-list' : ''}`}>
      {posts.map((post) => {
        const date = dateParts(post)
        return (
          <li key={`${post.folder}/${post.slug}`}>
            <Link
              className="editorial-post-row"
              href={`/${post.folder}/${post.slug}`}
            >
              <time dateTime={date?.iso}>
                {date
                  ? `${archive ? '' : date.year + '.'}${date.month}.${date.day}`
                  : '日期待补充'}
              </time>
              <span className="editorial-post-title">
                {post.metadata.title || post.slug}
              </span>
              {!archive && (
                <span className="post-section-label">
                  {sectionLabels[post.folder] || '文章'}
                </span>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
