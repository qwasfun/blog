import Link from 'next/link'

import { formatDate } from '../utils/formatDate'

export function PostList(props) {
  const { list } = props

  return (
    <div>
      {list.length != 0 ? (
        list.map((post) => (
          <Link
            key={post.id}
            target="_blank"
            rel="nofollow noopener"
            className="flex flex-col space-y-1 mb-4"
            href={`${post.link}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight md:order-last">
                {post.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 pr-2 tabular-nums">
                {formatDate(post.pubDate, true)}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center">空</div>
      )}
      <div className="w-full flex flex-col md:flex-row space-x-0 justify-between">
        <div>
          <Link
            href={`/reader?p=${props.page - 1}`}
            className={props.page <= 1 ? 'hidden' : ''}
          >
            <div className="rounded-4xl bg-black px-3.5 py-1.25 my-1 text-[0.8125rem]/6 text-center font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
              上一页
            </div>
          </Link>
        </div>
        <div>
          <Link
            href={`/reader?p=${props.page - 0 + 1}`}
            className={list.length < 20 ? 'hidden' : ''}
          >
            <div className="rounded-4xl bg-black px-3.5 py-1.25 my-1 text-[0.8125rem]/6 text-center font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
              下一页
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
