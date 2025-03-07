import { getPostFiles } from 'app/utils/utils'
import { formatDate } from './utils/formatDate'
import { appFolders, baseUrl } from './config'

export default async function sitemap() {
  const posts = getPostFiles(appFolders).map((post) => ({
    url: `${baseUrl}/${post.folder}/${post.slug}`,
    lastModified: formatDate(post.metadata.createdAt),
  }))

  const routes = ['', ...appFolders].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: formatDate(Date()),
  }))

  return [...routes, ...posts]
}
