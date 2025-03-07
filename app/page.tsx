import { PostList } from 'app/components/PostList'
import { getPostFiles } from './utils/utils'
import { appFolders } from './config'

export default function Page() {
  const list = getPostFiles(appFolders)
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
