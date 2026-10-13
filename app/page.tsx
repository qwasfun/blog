import Link from 'next/link'
import { EditorialPostList } from './components/editorial-post-list'
import { sortPosts } from './utils/post-index'
import { getPostFiles } from './utils/utils'
import { appFolders } from './config'
import { metadataBase } from './components/metadataBase'

export const metadata = {
  ...metadataBase,
  title: 'Qwas',
}

export default function Page() {
  const list = sortPosts(getPostFiles(appFolders)).slice(0, 6)
  return (
    <section>
      <div className="home-intro">
        <p>记录技术实践与日常思考。</p>
      </div>
      <div className="editorial-section-heading">
        <h1>最新文章</h1>
        <span aria-hidden="true">RECENT WRITINGS</span>
      </div>
      <EditorialPostList posts={list} />
      <Link href="/blog" className="all-posts-link">
        查看全部文章 <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
