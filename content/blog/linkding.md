# linkding 使用

项目地址：https://github.com/sissbruecker/linkding.git

在 claw.cloud 部署

镜像地址 `sissbruecker/linkding:latest-plus`

CPU 0.5

内存 1G

Environment Variables 里添加

```ini
LD_SUPERUSER_NAME=dong
LD_SUPERUSER_PASSWORD=1K**********Fc
LD_DISABLE_BACKGROUND_TASKS=False
LD_DISABLE_URL_VALIDATION=False
LD_ENABLE_AUTH_PROXY=False
LD_DB_ENGINE=sqlite
LD_DB_DATABASE=linkding
```

> 其中的 `LD_SUPERUSER_NAME` 是网页端的超级用户，`LD_SUPERUSER_PASSWORD` 是网页端超级用户的密码

Local Storage 添加 `/etc/linkding/data`

点部署

https://odjaddqlmsad.ap-southeast-1.clawcloudrun.com

## 安装 浏览器插件

linkding-extension 插件

https://chromewebstore.google.com/detail/linkding-extension/beakmhbijpdhipnjhnclmhgjlddhidpe

SingleFile 插件

https://chromewebstore.google.com/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle

配置

保存位置 -> 保存到 REST 表单 API

`https://odjaddqlmsad.ap-southeast-1.clawcloudrun.com/api/bookmarks/singlefile/`
