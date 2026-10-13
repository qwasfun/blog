import Link from 'next/link'
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import React from 'react'
import remarkGfm from 'remark-gfm'
import { EnhancedImage } from './EnhancedImage'
import Audio from './Audio'
import Video from './Video'
import retypePrism from 'rehype-prism-plus'
import { remarkMediaToComponent } from '../../lib/remark-media'
import { Tabs, TabItem } from './Tabs'
import { ArticleCodeBlock } from './article-code-block'
import { articleHeadings, ArticleHeading } from '../utils/article-headings'

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMediaToComponent, remarkGfm],
    rehypePlugins: [retypePrism], // 用于代码高亮
    format: 'mdx' as const,
  },
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function slugify(str) {
  return (
    str
      .toString()
      .toLowerCase()
      .trim() // Remove whitespace from both ends of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      // .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
      .replace(/\-\-+/g, '-')
  ) // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: EnhancedImage,
  img: EnhancedImage,
  Video: Video,
  Audio: Audio,
  a: CustomLink,
  Tabs,
  TabItem,
  // 代码演示组件
  Demo: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-lg border bg-card p-6">
      <div className="mb-4 text-sm font-medium text-muted-foreground">演示</div>
      {children}
    </div>
  ),
}

export async function CustomMDX({
  editorial = false,
  ...props
}: MDXRemoteProps & { editorial?: boolean }) {
  if (!editorial)
    return <MDXRemote {...props} components={components} options={options} />
  const headings: ArticleHeading[] = []
  const articleComponents = { ...components }
  for (let level = 1; level <= 6; level++) {
    articleComponents[`h${level}`] = ({ children, id }) =>
      React.createElement(`h${level}`, { id }, children)
  }
  articleComponents['pre'] = ({ children }) => {
    const code = React.Children.toArray(children).find((child) =>
      React.isValidElement(child)
    )
    const className = React.isValidElement<{ className?: string }>(code)
      ? code.props.className || ''
      : ''
    const rawLanguage = /language-([^\s]+)/.exec(className)?.[1] || 'text'
    const language =
      { py: 'python', sh: 'shell', js: 'javascript', ts: 'typescript' }[
        rawLanguage
      ] || rawLanguage
    return <ArticleCodeBlock language={language}>{children}</ArticleCodeBlock>
  }
  const { content } = await compileMDX({
    ...props,
    components: articleComponents,
    options: {
      ...options,
      mdxOptions: {
        ...options.mdxOptions,
        remarkPlugins: [
          ...options.mdxOptions.remarkPlugins,
          articleHeadings(headings),
        ],
      },
    },
  })
  return (
    <>
      {headings.length > 0 && (
        <details className="article-toc">
          <summary>目录</summary>
          <nav aria-label="文章目录">
            <ol>
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{
                    paddingLeft: `${Math.max(0, heading.depth - 2) * 16}px`,
                  }}
                >
                  <a href={`#${encodeURIComponent(heading.id)}`}>
                    {heading.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>
      )}
      {content}
    </>
  )
}
