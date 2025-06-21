# 新增 Image 组件

组件原本准备命名为 EnhancedImage，但如果命名为 Image， 在 GitHub 上 Markdown 也能预览图片，所以用 Image 了。

优先显示 enhancedSrc，点击右上角按钮，切换显示

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
<Image
  src="https://static.qwas.fun/public/2025/06/street.jpg"
  alt="街头摄影"
/>
```

<Image src="https://static.qwas.fun/public/2025/06/street.jpg"
 alt="街头摄影"
/>
