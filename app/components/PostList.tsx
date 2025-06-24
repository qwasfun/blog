import Link from 'next/link'

import { formatDate } from '../utils/formatDate'

export function PostList(props) {
  const { list } = props

  return (
    <ul>
      {list
        .sort((a, b) => {
          if (new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <li key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/${post.folder}/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight md:order-last">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                  {formatDate(post.metadata.createdAt, false)}
                </p>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  )
}
