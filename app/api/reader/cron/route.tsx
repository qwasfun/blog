import Parser from 'rss-parser'
import { rssFeed, rssPost } from '../../../../database/schema'
import { db } from '../../../../database/drizzle'
import { sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

type CustomFeed = { id: number }
type CustomItem = {
  title: string
  link: string
  author: string
  pubDate: string
  content: string
}

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: [],
    item: ['title', 'link', 'author', 'pubDate', 'content'],
  },
})

async function fetchAndSave(feed) {
  const posts = await parser.parseURL(feed.feedLink)

  const parsedPosts = (posts.items as CustomItem[])
    .map((item) => {
      return {
        title: item.title,
        link: item.link,
        author: item.author ?? '',
        feedId: feed.id,
        content: item.content ?? '',
        pubDate: new Date(item.pubDate),
      }
    })
    .filter((item, index, self) => {
      // 去重，新的内容覆盖旧的
      return index === self.findIndex((obj) => obj.link === item.link)
    })

  await db
    .insert(rssPost)
    .values(parsedPosts)
    .onConflictDoUpdate({
      target: rssPost.link,
      set: {
        title: sql`excluded
        .
        title`,
        author: sql`excluded
        .
        author`,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      },
    })
}

export async function GET() {
  let feeds = await db.select().from(rssFeed)

  const promises = feeds.map(async (feed, index) => {
    try {
      await fetchAndSave(feed)
      return `第 ${index + 1} 项 ${feed.feedLink} 时执行成功`
    } catch (error) {
      return `第 ${index + 1} 项 ${feed.feedLink} 时执行错误: ${error.message}`
    }
  })

  const results = await Promise.allSettled(promises)

  revalidatePath('/reader') // 清除/reader路径的缓存数据

  // 打印结果
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(result.value)
    } else {
      console.error(`第 ${index + 1} 项出错:`, result.reason.message)
    }
  })

  return Response.json(results)
}
