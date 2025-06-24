import { CustomMDX } from 'app/components/mdx'
import { getPostFiles } from 'app/utils/utils'

import { ArrowIcon } from 'app/components/icons'
import { formatDate } from '../../utils/formatDate'
import { notFound } from 'next/navigation'
import { folder } from '../config'
import { baseUrl, siteTitle } from '../../config'

// 返回一个 `params` 列表来填充 [slug] 动态段
export async function generateStaticParams() {
  // 获取文件夹下所有文章
  const posts = getPostFiles([folder])

  // 根据文章生成 slug 参数
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props) {
  const params = await props.params;
  const post = getPostFiles([folder]).find((post) => post.slug === params.slug)
  if (!post) {
    return {}
  }

  const { title, createdAt, summary: description, image } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title: title + ' - ' + siteTitle,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: createdAt,
      url: `${baseUrl}/${folder}/${post.slug}`,
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

/**
 * 只有用了动态路由才会调用了 generateStaticParams，并能从 params 取到路由的参数信息，否则 Page 的参数为空
 * 通过遍历 generateStaticParams 返回的数组(posts)生成页面
 * params的值是 posts 数组中某一项
 */
export default async function Page(props) {
  const params = await props.params;
  const post = getPostFiles([folder]).find((post) => post.slug === params.slug)

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
      <h1 id="title" className="title font-semibold text-4xl tracking-tighter">
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
            href={`https://github.com/qwasfun/blog/blob/main/content/${folder}/${post.slug}.md`}
          >
            <ArrowIcon />
            <p className="ml-2 h-7">View this page on Github</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
