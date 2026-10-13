import test from 'node:test'
import assert from 'node:assert/strict'
import { articleHeadings } from '../app/utils/article-headings.ts'

test('formatted, repeated and reserved headings receive matching unique IDs', () => {
  const heading = (children) => ({ type: 'heading', depth: 2, children })
  const plain = (value) => ({ type: 'text', value })
  const tree = {
    type: 'root',
    children: [
      heading([plain('安装 '), { type: 'inlineCode', value: '工具' }]),
      heading([plain('安装 工具')]),
      heading([plain('安装-工具-1')]),
      heading([plain('title')]),
      { type: 'code', value: '## Not a heading' },
    ],
  }
  const directory = []
  articleHeadings(directory)()(tree)
  assert.deepEqual(
    directory.map((item) => item.id),
    ['安装-工具', '安装-工具-1', '安装-工具-1-1', 'title-1']
  )
  assert.equal(directory[0].title, '安装 工具')
  assert.deepEqual(
    tree.children.slice(0, 4).map((node) => node.data.hProperties.id),
    directory.map((item) => item.id)
  )
})
