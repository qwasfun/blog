import Link from 'next/link'
import { ChronologicalArchive } from '../components/chronological-archive'

type ReaderPost = { id: number; title: string; link: string; pubDate: Date }

export function PostList({ list, page }: { list: ReaderPost[]; page: number }) {
  return (
    <>
      <ChronologicalArchive
        title="阅读"
        description="来自订阅源的文章与阅读记录。"
        entries={list.map((post) => ({
          id: post.id,
          title: post.title,
          href: post.link,
          date: post.pubDate,
          external: true,
        }))}
      />
      <nav className="archive-pagination" aria-label="阅读列表分页">
        {page > 1 ? (
          <Link href={`/reader?p=${page - 1}`}>← 上一页</Link>
        ) : (
          <span />
        )}
        <span className="pagination-page">第 {page} 页</span>
        {list.length >= 20 ? (
          <Link href={`/reader?p=${page + 1}`}>下一页 →</Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  )
}
