import { siteTitle } from 'app/config'
import { PostList } from './PostList'
import { db } from 'database/drizzle'
import { rssPost } from 'database/schema'
import { desc } from 'drizzle-orm'
import { metadataBase } from 'app/components/metadataBase'

export const dynamic = 'force-dynamic'

export const metadata = {
  ...metadataBase,
  title: 'Reader - ' + siteTitle,
}

export default async function Page({ searchParams }) {
  const pageSize = 20
  const page = searchParams.p ?? 1
  const postList = await db
    .select()
    .from(rssPost)
    .orderBy(desc(rssPost.pubDate))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Reader</h1>
      <div className="my-8">
        <PostList list={postList} page={page} />
      </div>
    </section>
  )
}
