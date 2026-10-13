import { PostList } from './PostList'
import { getPostFiles } from '../utils/utils'
import { notFound } from 'next/navigation'
import { metadataBase } from './metadataBase'
import { siteTitle } from '../config'
import { ChronologicalArchive } from './chronological-archive'

export function getFolderTitle(folder: string) {
  return folder.replace(/\b(\s\w|^\w)/g, (txt) => txt.toUpperCase())
}

export function generateListMetadata(folder: string) {
  return {
    ...metadataBase,
    title: getFolderTitle(folder) + ' - ' + siteTitle,
  }
}

export default function GenericListPage({ folder }: { folder: string }) {
  const list = getPostFiles([folder])
  if (list.length === 0) notFound()
  if (folder === 'travel' || folder === 'changelog') {
    return (
      <ChronologicalArchive
        title={folder === 'travel' ? '旅行' : '更新记录'}
        description={
          folder === 'travel'
            ? '记录旅途中的见闻与日常。'
            : '记录博客的功能更新与改进。'
        }
        entries={list.map((post) => ({
          id: `${post.folder}/${post.slug}`,
          title: post.metadata.title || post.slug,
          href: `/${post.folder}/${post.slug}`,
          date: post.metadata.createdAt,
        }))}
      />
    )
  }
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {getFolderTitle(folder)}
      </h1>
      <PostList list={list} />
    </section>
  )
}
