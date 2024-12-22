import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getPostFiles } from 'app/utils/utils'
import { baseUrl } from 'app/sitemap'

import { ArrowIcon } from 'app/components/icons'
import { formatDate } from '../../utils/formatDate'

// 返回一个 `params` 列表来填充 [slug] 动态段
export async function generateStaticParams() {
  const folders = process.env.CONTENT_FOLDERS?.split(',') || ['blog']

  // 为每个文件夹获取所有文章
  const params = folders.flatMap((folder) => {
    const posts = getPostFiles([folder])

    // 为每篇文章返回 folder 和 slug 参数
    return posts.map((post) => ({
      folder: folder,
      slug: post.slug,
    }))
  })

  return params
}

export function generateMetadata({ params }) {
  const post = getPostFiles([params.folder]).find(
    (post) => post.slug === params.slug
  )
  if (!post) {
    return {}
  }

  const { title, createdAt, summary: description, image } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime:createdAt,
      url: `${baseUrl}/${params.folder}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Post({ params }) {
  const post = getPostFiles([params.folder]).find(
    (post) => post.slug === params.slug
  )

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.createdAt,
            dateModified: post.metadata.updatedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/${post.folder}/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-4xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex flex-col md:flex-row mt-3 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          发表于 {formatDate(post.metadata.createdAt, true)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 md:ml-3">
          最后更新于 {formatDate(post.metadata.updatedAt, true)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://github.com/qwasfun/blog/blob/main/content/${post.folder}/${post.slug}.md`}
          >
            <ArrowIcon />
            <p className="ml-2 h-7">View this page on Github</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
