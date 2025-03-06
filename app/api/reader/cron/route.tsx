import Parser from 'rss-parser'
import { rssFeed, rssArticle } from '../../../../database/schema'
import { db } from '../../../../database/drizzle'
import { sql } from 'drizzle-orm'

type CustomFeed = { id: number }
type CustomItem = {
  title: string
  link: string
  author: string
  pubDate: string
}

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: [],
    item: ['title', 'link', 'author', 'pubDate'],
  },
})

async function fetchAndSave(feed) {
  const articles = await parser.parseURL(feed.feedLink)
  const newArticles = articles.items.map((item) => {
    return {
      title: item.title,
      link: item.link,
      author: item.author ?? '',
      feedId: feed.id,
      pubDate: new Date(item.pubDate),
    }
  })

  await db
    .insert(rssArticle)
    .values([...newArticles])
    .onConflictDoUpdate({
      target: rssArticle.link,
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
