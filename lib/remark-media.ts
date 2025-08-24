import { visit } from 'unist-util-visit'

/**
 * <img>, <video>, <audio>
 * 既可能出现在块级 (flow)
 * 也可能在行内 (text)。
 **/
export function remarkMediaToComponent() {
  return (tree: any) => {
    const replace = (node: any) => {
      if (node.name === 'video') {
        node.name = 'Video' // 自定义视频组件
      }
      if (node.name === 'audio') {
        node.name = 'Audio' // 自定义音频组件
      }
      if (node.name === 'img') {
        node.name = 'Image' // 替换成 <Image>
      }
    }

    visit(tree, 'mdxJsxFlowElement', replace)
    visit(tree, 'mdxJsxTextElement', replace)
  }
}
