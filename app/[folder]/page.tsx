import { PostList } from 'app/components/PostList'
import { getPostFiles } from 'app/utils/utils'
import NotFound from 'app/NotFound'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}
// 返回一个 `params` 列表来填充 [slug] 动态段
export async function generateStaticParams() {
  const folders = process.env.CONTENT_FOLDERS?.split(',') || []

  // 需要返回一个包含 params 对象的数组
  return folders.map((folder) => ({
    folder: folder,
  }))
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
