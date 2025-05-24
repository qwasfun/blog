import { PostList } from 'app/components/PostList'
import { getPostFiles } from 'app/utils/utils'
import { notFound } from 'next/navigation'
// import { folder } from './config'
const folder = 'changelog'
import { siteTitle } from 'app/config'
import { metadataBase } from '../components/metadataBase'

const folderTitle = folder.replace(/\b(\s\w|^\w)/g, function (txt) {
  return txt.toUpperCase()
})

export const metadata = {
  ...metadataBase,
  title: folderTitle + ' - ' + siteTitle,
}

export default function Page() {
  const list = getPostFiles([folder])

  if (list.length === 0) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {folderTitle}
      </h1>
      <PostList list={list} />
    </section>
  )
}
