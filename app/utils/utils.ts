import fs from 'fs'
import path from 'path'
import { createdCommitTime, lastUpdatedCommitTime } from './commitTime'

type Metadata = {
  title?: string
  summary?: string
  image?: string
}

function parseFrontMatter(fileContent: string) {
  let frontMatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontMatterRegex.exec(fileContent)
  let frontMatterBlock = match ? match![1] : ''
  let content = fileContent.replace(frontMatterRegex, '').trim()
  let metadata: Partial<Metadata> = {}

  // 文件存在 front matter 信息
  if (frontMatterBlock) {
    let frontMatterLines: string[] = []
    frontMatterLines = frontMatterBlock
      ? frontMatterBlock.trim().split('\n')
      : []

    frontMatterLines.forEach((line) => {
      let [key, ...valueArr] = line.split(': ')
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
      metadata[key.trim() as keyof Metadata] = value
    })
  } else {
    // 不存在 matter 信息，读取第一行 # 作为 标题
    metadata.title = content.match(/^#\s+(.*)$/m)![1] || ''
    content = content.replace(/^#\s+(.*)$/m, '')
  }

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  let files: string[] = []
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
  }
  return files.filter(
    (file) => path.extname(file) === '.md' || path.extname(file) === '.mdx'
  )
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontMatter(rawContent)
}

function getMDXData(folder: string) {
  let dir = path.join(process.cwd(), 'content', folder)

  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    let updatedAt = lastUpdatedCommitTime(path.join(dir, file))
    let createdAt = createdCommitTime(path.join(dir, file))

    let metadataData = Object.assign({}, metadata, {
      updatedAt: updatedAt,
      createdAt: createdAt,
    })

    return {
      folder,
      metadata: metadataData,
      slug,
      content,
    }
  })
}

export function getPostFiles(folders: string[]) {
  let files: any = []

  for (let i = 0; i < folders.length; i++) {
    let folder = folders[i]
    let file = getMDXData(folder)

    files = files.concat(file)
  }

  return files
}
