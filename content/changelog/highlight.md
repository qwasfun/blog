# 代码块语法高亮

语法高亮显示有些问题，困扰我很久了，今天终于揪出原因所在，一直以来我以为 `next-mdx-remote` 转换 markdown 的时候出现的问题，或者是 mdx，又或者是 taiwindcss 使用了新的css属性触及了我的知识盲区？最终发现是 sugar-high 的问题。

[How to highlight a part of code block in markdown](https://stackoverflow.com/questions/70175230/how-to-highlight-a-part-of-code-block-in-markdown)

[sugar-high](https://github.com/huozhi/sugar-high) 转换后的代码里会包多余的换行导致显示出现多的空白，以及莫名的多行，用 [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus) 则不会

我的理解是 rehype-prism-plus 是基于 prism 为 next.js 作了适配，prism 提供了多种主题[prism-themes](https://github.com/PrismJS/prism-themes)，目前我使用了两个主题，分别是 [VS](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vs.css) 对应 light 模式， [VS Code Dark+](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vsc-dark-plus.css) 对应于 dark 模式

```css
@import '../node_modules/prism-themes/themes/prism-vs.css';

@media (prefers-color-scheme: dark) {
  @import '../node_modules/prism-themes/themes/prism-vsc-dark-plus.css';
}
```
