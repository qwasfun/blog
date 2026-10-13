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

export default async function Page(props) {
  const searchParams = await props.searchParams
  const pageSize = 20
  const requestedPage = Number(searchParams.p ?? 1)
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const postList = await db
    .select()
    .from(rssPost)
    .orderBy(desc(rssPost.pubDate))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return <PostList list={postList} page={page} />
}
