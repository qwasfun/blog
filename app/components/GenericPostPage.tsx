import { CustomMDX } from './mdx'
import { getPostFiles } from '../utils/utils'
import { ArrowIcon } from './icons'
import { formatDate } from '../utils/formatDate'
import { notFound } from 'next/navigation'
import { baseUrl, siteTitle } from '../config'

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
            author: { '@type': 'Person', name: 'My Portfolio' },
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
