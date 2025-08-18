import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import remarkGfm from 'remark-gfm'
import { EnhancedImage } from './EnhancedImage'
import retypePrism from 'rehype-prism-plus'

import { Tabs, TabItem } from './Tabs'

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [retypePrism],
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

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: EnhancedImage,
  img: EnhancedImage,
  a: CustomLink,
  Tabs,
  TabItem,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={options}
    />
  )
}
