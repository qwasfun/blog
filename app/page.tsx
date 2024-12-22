import { PostList } from 'app/components/PostList'
import { getPostFiles } from './utils/utils'

export default function Page() {
  const folder = process.env.CONTENT_FOLDERS?.split(',') || []
  const list = getPostFiles(folder)
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Qwas</h1>
      <p className="mb-4">{`I'm ...`}</p>
      <div className="my-8">
        <PostList list={list} />
      </div>
    </section>
  )
}
