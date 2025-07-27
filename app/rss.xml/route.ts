import { appFolders, baseUrl } from 'app/config'
import { getPostFiles } from 'app/utils/utils'

export const dynamic = 'force-static'

export async function GET() {
  let list = getPostFiles(appFolders)

  const itemsXml = list
    .sort((a, b) => {
      if (new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) => `
        <item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/${post.folder}/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(post.metadata.createdAt).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Qwas</title>
      <link>${baseUrl}</link>
      <description>This is Qwas portfolio RSS feed</description>
      ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml;charset=UTF-8',
    },
  })
}
