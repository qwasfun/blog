import { getPostFiles } from 'app/utils/utils'
import { formatDate } from './utils/formatDate'

export const baseUrl = 'https://qwas.fun'

export default async function sitemap() {
  const folder = process.env.CONTENT_FOLDERS?.split(',') || []
  const posts = getPostFiles(folder).map((post) => ({
    url: `${baseUrl}/${post.folder}/${post.slug}`,
    lastModified: formatDate(post.metadata.createdAt),
  }))

  const routes = ['', ...folder].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: formatDate(Date()),
  }))

  return [...routes, ...posts]
}
