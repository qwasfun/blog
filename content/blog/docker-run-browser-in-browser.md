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

## 设置访问密码

> ⚠️⚠️ 公网使用，一定一定一定要设置密码，否则很容易就会被扫描到，安装挖矿脚本，不用的时候，记得关闭容器。
>
> 如果被安装了挖矿脚本，关掉容器并删除就可以了。

### docker cli

```sh
docker run --restart no -p 5901:3001 \
-e DOCKER_MODS=linuxserver/mods:universal-package-install \
-e INSTALL_PACKAGES=fonts-noto-cjk \
-e CUSTOM_USER=abc \
-e PASSWORD=12345ADS \
-v /root/firefox/config:/config \
-v /root/Downloads:/Downloads  \
linuxserver/firefox:latest
```

### docker compose

```yaml
services:
  firefox:
    image: lscr.io/linuxserver/firefox:latest
    container_name: firefox
    security_opt:
      - seccomp:unconfined #optional
    environment:
      - DOCKER_MODS=linuxserver/mods:universal-package-install
      - INSTALL_PACKAGES=fonts-noto-cjk
      - LC_ALL=zh_CN.UTF-8
      - PUID=1000
      - PGID=1000
      - CUSTOM_USER=abc
      - PASSWORD=12345ADS!$%aa # 请修改为强密码
      - TZ=Etc/UTC
      - FIREFOX_CLI=https://web.telegram.org/k/ #optional 设置浏览器主页
    volumes:
      - ./firefox/config:/config
      - /root/Downloads:/Downloads
    ports:
      - 5901:3001
    shm_size: '1gb'
    restart: unless-stopped
```

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
