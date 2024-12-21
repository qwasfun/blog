import { PostList } from 'app/components/PostList'
import { getPostFiles } from 'app/utils'
import NotFound from 'app/not-found'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page({ params }) {
  const { folder } = params
  const list = getPostFiles([folder])
  const folderTitle = folder.replace(/\b(\s\w|^\w)/g, function (txt) {
    return txt.toUpperCase()
  })
  if (list.length === 0) {
    return <NotFound />
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
