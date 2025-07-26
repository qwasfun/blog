# 书签管理应用 - linkding

项目地址：https://github.com/sissbruecker/linkding.git

## 介绍

linkding 是书签管理自托管程序。

正困于收藏书签太多，考虑如何整理，找到 linkding 后，部署试用了几天，挺有用的。

提供网页内容保存功能，避免网页失效。自带服务端抓取网页，也提供 SingleFile 上传接口，通过 SingleFile 插件在客户端抓取上传，便于保存那些有反爬策略网站内容

应用地址：https://linkding.qwas.fun

共享书签：https://linkding.qwas.fun/bookmarks/shared

## 安装

镜像地址 `sissbruecker/linkding:latest-plus`

docker compose.yml

```yml
services:
  linkding:
    image: sissbruecker/linkding:latest-plus
    container_name: linkding
    ports:
      - 9090:9090
    volumes:
      - '/srv/linkding/data:/etc/linkding/data'
    environment:
      - LD_SUPERUSER_NAME=qwas
      - LD_SUPERUSER_PASSWORD=1K**********Fc
      - LD_DISABLE_BACKGROUND_TASKS=False
      - LD_DISABLE_URL_VALIDATION=False
      - LD_ENABLE_AUTH_PROXY=False
      - LD_DB_ENGINE=sqlite
      - LD_DB_DATABASE=linkding
      # 解决 CSRF verification failed 的错误
      - LD_CSRF_TRUSTED_ORIGINS=https://linkding.qwas.fun
    restart: unless-stopped
```

> 其中的 `LD_SUPERUSER_NAME` 是网页端的超级用户，`LD_SUPERUSER_PASSWORD` 是网页端超级用户的密码

## 安装 浏览器插件

linkding extension 插件

https://chromewebstore.google.com/detail/linkding-extension/beakmhbijpdhipnjhnclmhgjlddhidpe

SingleFile 插件

https://chromewebstore.google.com/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle

## 配置 SingleFile 自动保存

在 SingleFile 插件设置中，保存位置 -> 保存到 REST 表单 API

`https://linkding.qwas.fun/api/bookmarks/singlefile/`

![查看配置截图](https://static.qwas.fun/public/2025/06/linkding-singfile.png)

## Pocket 的内容迁移 linkding

Pocket 前些天关闭了，提供数据导出。下载导出数据，使用 [Pocket2Linkding](https://github.com/hkclark/Pocket2Linkding) 将导出的 csv 文件转换成 linkding's 导入支持的格式

为了区分，我原有代码基础上添加了一个自定义 tags，这样导入的所有书签都会有 **Pocket** 这个标签

https://github.com/hkclark/Pocket2Linkding/blob/master/Pocket2Linkding.py#L132

```python
converter=lambda value: (value.split("|") if value else []) + ["Pocket"],
```

导入之后看了一下，最后一条收藏是四年前😂，难怪会倒闭~

## 失败案例

一开始准备部署在 claw cloud 上的，免费的羊毛薅一薅。想着数据分离，使用 postgresql 数据库，然而 lingding 应用大约会15分钟自动刷新一次页面，导致 neon 数据库几乎全天在运行，neon 免费用户每月包含191小时，照这样下去，一周就用完了，这哪行啊。

改用 sqlite， 反正存档数据总要保存在本地磁盘的。但是 claw cloud 的控制台网络特别卡顿，挂了代理，也还是卡，经常就刷不出来（用的新加坡区，刚开始用的时候感觉还行，反正后来就是经常操作没反应）。再次放弃。

最后决定使用的家里闲置电脑部署，正好周末在家方便安装，内网运行，使用 frp 映射到外网。

让老旧的电脑再次发光发热。O(∩_∩)O
