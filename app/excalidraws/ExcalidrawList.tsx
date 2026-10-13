import { ChronologicalArchive } from '../components/chronological-archive'

type Drawing = { title: string; link: string; createdAt: string }

export function ExcalidrawList({ list }: { list: Drawing[] }) {
  return (
    <ChronologicalArchive
      title="Excalidraw 画板"
      description="图解、草稿与思考记录。"
      entries={list.map((post) => ({
        id: post.link,
        title: post.title,
        href: `/excalidraw?f=${encodeURIComponent(post.link)}`,
        date: post.createdAt,
      }))}
    />
  )
}
