# 新增 Image 组件

组件原本准备命名为 EnhancedImage，但我发现 GitHub 的 Markdown 文件预览是可以预览 Image 标签的，于是选择使用 Image 标签，这样在 GitHub 上查看源码时也能直接预览图片。

## 功能特性

- 增强 markdown 文件中图片功能

- 实现了图片的切换展示，放大缩小，全屏显示，优先展示修饰图片

- 适配桌面端键盘鼠标事件，适配移动端触摸事件

## 组件使用

- 同时设置 `enhancedSrc` 和 `src`，会优先应用 `enhancedSrc`，显示切换按钮，点击按钮，切换显示。

- 若只设置 `src`，则直接应用，不显示切换按钮，

## 示例

```tsx
<Image
  src="https://static.qwas.fun/public/2025/06/street.jpg"
  enhancedSrc="https://static.qwas.fun/public/2025/06/street-enhanced.jpg"
  alt="街头摄影"
  defaultName="原图"
  enhancedName="修饰图"
/>
```

<Image src="https://static.qwas.fun/public/2025/06/street.jpg"
 enhancedSrc="https://static.qwas.fun/public/2025/06/street-enhanced.jpg"
 alt="街头摄影"
 defaultName="原图"
 enhancedName="修饰图"
/>

```tsx
<Image src="https://static.qwas.fun/public/2025/06/street.jpg" alt="街头摄影" />
```

<Image src="https://static.qwas.fun/public/2025/06/street.jpg"
 alt="街头摄影"
/>
