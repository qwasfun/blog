import Link from 'next/link'

import { formatDate } from '../utils/formatDate'

export function ExcalidrawList(props) {
  const { list } = props

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Excalidraw
      </h1>
      <div></div>
      {list.length != 0 ? (
        list.map((post) => (
          <Link
            key={post.id}
            rel="nofollow noopener"
            className="flex flex-col space-y-1 mb-4"
            href={`/excalidraw?f=${post.link}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight md:order-last">
                {post.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 pr-2 tabular-nums">
                {formatDate(post.createdAt, false)}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center">空</div>
      )}
    </div>
  )
}
