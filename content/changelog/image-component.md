# 新增 Image 组件

组件原本准备命名为 EnhancedImage，但我发现 GitHub 的 Markdown 文件预览是可以预览 Image 标签的，于是选择使用 Image 标签，这样在 GitHub 上查看源码时也能直接预览图片。

## 功能特性

- 增强 markdown 文件中图片功能

- 实现了图片的切换展示，放大缩小，全屏显示，优先展示增强图片

- 适配桌面端键盘鼠标事件，适配移动端触摸事件

## 组件使用

- 默认使用 `src` 作为图片地址，若需原图和增强图切换展示，将原图设置为 `originSrc` 。

## 示例

### 原图和增强图切换显示

```tsx
<Image
  originSrc="https://static.qwas.fun/public/2025/06/street.jpg"
  src="https://static.qwas.fun/public/2025/06/street-enhanced.jpg"
  alt="街头摄影"
  defaultName="原图"
  enhancedName="增强图"
/>
```

<Image 
 originSrc="https://static.qwas.fun/public/2025/06/street.jpg"
 src="https://static.qwas.fun/public/2025/06/street-enhanced.jpg"
 alt="街头摄影"
 defaultName="原图"
 enhancedName="增强图"
/>

### 只有原图

```tsx
<Image src="https://static.qwas.fun/public/2025/06/street.jpg" alt="街头摄影" />
```

<Image src="https://static.qwas.fun/public/2025/06/street.jpg"
 alt="街头摄影"
/>

### Markdown 语法 （只支持显示原图）

```md
![街头摄影](https://static.qwas.fun/public/2025/06/street.jpg)
```

![街头摄影](https://static.qwas.fun/public/2025/06/street.jpg)

### 直接使用 img 标签 （无增强功能）

```html
<img src="https://static.qwas.fun/public/2025/06/street.jpg" alt="街头摄影" />
```

<img src="https://static.qwas.fun/public/2025/06/street.jpg"
 alt="街头摄影"
/>
