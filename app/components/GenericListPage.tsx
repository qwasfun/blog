import { PostList } from './PostList'
import { getPostFiles } from '../utils/utils'
import { notFound } from 'next/navigation'
import { metadataBase } from './metadataBase'
import { siteTitle } from '../config'

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
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {getFolderTitle(folder)}
      </h1>
      <PostList list={list} />
    </section>
  )
}
