export type ArticleHeading = { id: string; title: string; depth: number }
type MarkdownNode = {
  type: string
  depth?: number
  value?: string
  children?: MarkdownNode[]
  data?: { hProperties?: Record<string, unknown> }
}

function text(node: MarkdownNode): string {
  return node.value || node.children?.map(text).join('') || ''
}

export function headingSlug(title: string) {
  return (
    title
      .normalize('NFKC')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/-+/g, '-') || 'section'
  )
}

// The same parsed Markdown nodes supply the directory and rendered heading IDs.
export function articleHeadings(headings: ArticleHeading[]) {
  return () => (tree: MarkdownNode) => {
    const used = new Set<string>(['title'])
    function walk(node: MarkdownNode) {
      if (node.type === 'heading') {
        const title = text(node)
        const base = headingSlug(title)
        let id = base
        let suffix = 1
        while (used.has(id)) id = `${base}-${suffix++}`
        used.add(id)
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        }
        headings.push({ id, title, depth: node.depth || 2 })
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}
