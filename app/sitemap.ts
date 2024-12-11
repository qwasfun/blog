import { getPostFiles } from 'app/utils'

export const baseUrl = 'https://qwas.fun'

export default async function sitemap() {
  const folder = process.env.CONTENT_FOLDERS?.split(',') || []
  const posts = getPostFiles(folder).map((post) => ({
    url: `${baseUrl}/${post.folder}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ['', ...folder].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...posts]
}
