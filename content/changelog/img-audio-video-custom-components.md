# 替换 img、audio、video 标签为自定义组件

## 背景

Blog 的图片、视频存储在对象存储中，无法通过 Git 跟踪历史记录。为了解决这个问题，现将所有图片、视频和文档统一存放在 Git 仓库中。然而，Next.js 在构建时会将 `public` 目录作为根路径，导致实际目录结构与预期不一致，从而造成本地预览和构建环境不兼容。本地无法正常预览，也会影响 GitHub 上的在线预览效果。

## 优化方案

将引用的图片统一存放在 `public/static/` 目录下，构建和部署时自动将路径替换为 `/static/`，以兼容本地编辑器预览和 GitHub 在线预览。同时，确保 Next.js 构建和部署后图片能够正常显示。自动将 Markdown 里 img、audio、video 标签替换成自定义 React 组件。

## 最终效果

图片演示

```html
<img src="../../public/static/2025/06/street.jpg" alt="街头摄影" />
```

<img src="../../public/static/2025/06/street.jpg" alt="街头摄影"/>

视频演示

```html
<video
  autoplay
  muted
  loop
  playsinline
  src="../../public/static/2025/08/Big_Buck_Bunny_720_10s_1MB.mp4"
></video>
```

<video
autoplay
muted
loop
playsinline
src="../../public/static/2025/08/Big_Buck_Bunny_720_10s_1MB.mp4"

> </video>

音频演示

```html
<audio muted loop src="../../public/static/2025/08/horse.mp3"></audio>
```

<audio muted loop src="../../public/static/2025/08/horse.mp3"></audio>
