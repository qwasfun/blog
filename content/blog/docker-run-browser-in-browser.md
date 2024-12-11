---
title: 用 Docker 在浏览器中再打开一个浏览器
publishedAt: 2024-06-25
summary:
---

有时候需要在服务端用一下图形界面，下面记录一下安装浏览器的方法。推荐使用 FireFox 或者 Chromium。Opera，MicroSoft Edge 虽然也列出来了，但不推荐，不稳定，易崩溃 (lll￢ω￢)

## FireFox

![FireFox 屏幕截图](https://static.qwas.fun/public/2024/06/screenshot-docker-firefox.png)

```sh
docker run --restart no -p 80:3000 -p 443:3001 \
linuxserver/firefox:latest
```

如果要访问中文网站，就需要处理中文字体显示，[Issues 在这里](https://github.com/linuxserver/docker-firefox/issues/36)

```sh
docker run --restart no -p 80:3000 -p 443:3001 \
-e DOCKER_MODS=linuxserver/mods:firefox-fonts \
linuxserver/firefox:latest
```

执行后 在浏览器访问 `http://ip:80` 或 `https://ip:443` 就可以看到类似截图的界面了。https 提示证书错误，是正常的因为使用的 自签的HTTPS证书。

[FireFox 屏幕截图](https://static.qwas.fun/public/2024/06/screenshot-docker-firefox.png)

[处理中文字体显示后的 FireFox 屏幕截图](https://static.qwas.fun/public/2024/06/screenshot-docker-firefox-font.png)

## Chromium

```sh
docker run --restart no -p 80:3000 -p 443:3001 \
linuxserver/chromium:latest
```

[Chromium 屏幕截图](https://static.qwas.fun/public/2024/06/screenshot-docker-chromium.png)

## Opera

```sh
docker run --restart no -p 80:3000 -p 443:3001 \
linuxserver/opera:latest
```

[Opera 屏幕截图](https://static.qwas.fun/public/2024/06/screenshot-docker-opera.png)

## MicroSoft Edge

```sh
docker run --restart no -p 80:3000 -p 443:3001 \
linuxserver/msedge:latest
```

[MicroSoft Edge 屏幕截图](https://static.qwas.fun/public/2024/06/screenshot-docker-msedge.png)
