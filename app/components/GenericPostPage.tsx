import { CustomMDX } from './mdx'
import { getPostFiles } from '../utils/utils'
import { formatDate } from '../utils/formatDate'
import { notFound } from 'next/navigation'
import { baseUrl, siteTitle } from '../config'
import { GitInfo } from './GitInfo'
import Link from 'next/link'

export async function generatePostStaticParams(folder: string) {
  const posts = getPostFiles([folder])
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generatePostMetadata(folder: string, slug: string) {
  const post = getPostFiles([folder]).find((post) => post.slug === slug)
  if (!post) return {}
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
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function GenericPostPage({
  folder,
  slug,
}: {
  folder: string
  slug: string
}) {
  const post = getPostFiles([folder]).find((post) => post.slug === slug)
  if (!post) notFound()
  const editorial = folder === 'blog'
  return (
    <section className={editorial ? 'article-detail' : undefined}>
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
            author: { '@type': 'Person', name: 'My Portfolio' },
          }),
        }}
      />
      {editorial && (
        <Link href="/blog" className="article-back-link">
          ← 返回文章
        </Link>
      )}
      <h1
        id="title"
        className={
          editorial
            ? 'article-title'
            : 'title font-semibold text-4xl tracking-tighter'
        }
      >
        {post.metadata.title}
      </h1>
      <div
        className={
          editorial
            ? 'article-dates'
            : 'flex flex-col md:flex-row mt-3 mb-8 text-sm'
        }
      >
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          发表于 {formatDate(post.metadata.createdAt, !editorial)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 md:ml-3">
          最后更新于 {formatDate(post.metadata.updatedAt, !editorial)}
        </p>
      </div>
      <article className={editorial ? 'prose article-prose' : 'prose'}>
        <CustomMDX source={post.content} editorial={editorial} />
      </article>
      {post.gitInfo && (
        <GitInfo
          gitInfo={post.gitInfo}
          slug={post.slug}
          folder={folder}
          fileExtension={post.fileExtension}
          editorial={editorial}
          className={editorial ? undefined : 'sticky top-20'}
        />
      )}
      {editorial && (
        <Link href="/blog" className="article-return-link">
          返回文章列表 →
        </Link>
      )}
    </section>
  )
}
