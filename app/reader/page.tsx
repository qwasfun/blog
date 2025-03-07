import { PostList } from './PostList'
import { db } from 'database/drizzle'
import { rssArticle } from 'database/schema'
import { desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function Page({ searchParams }) {
  const pageSize = 20
  const page = searchParams.p ?? 1
  const articleList = await db
    .select()
    .from(rssArticle)
    .orderBy(desc(rssArticle.pubDate))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Reader</h1>
      <div className="my-8">
        <PostList list={articleList} page={page} />
      </div>
    </section>
  )
}
