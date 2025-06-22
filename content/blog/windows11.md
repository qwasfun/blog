# Windows11 安装使用

## 安装硬盘

## 安装系统

## 系统检查更新

点击系统设置里的检查更新，缺少的设备驱动会自动下载安装

## 应用商店检查更新

系统自带的软件将自动更新

## 系统激活

## 重命名电脑名称

之前叫 `Thinking`， 这次命名为 `Thought` 以示区分

## 登录微软账户

登录 EDGE 同步书签、插件 ...

使用 OneDrive 同步文件 ...

## 软件安装

- [powershell 7](https://learn.microsoft.com/zh-cn/powershell/scripting/whats-new/migrating-from-windows-powershell-51-to-powershell-7?view=powershell-7.5#installing-powershell-7)

  > 如果 powershell 的配置同步到 onedrive，如果是重装了系统，powershell 执行可能会出错，需要删除配置，或将配置文件夹重命名

- [Git](https://git-scm.com/downloads/win)

- [NVM Windows](https://github.com/coreybutler/nvm-windows/releases)

  - nvm install 14
  - nvm install 16
  - nvm install 20
  - nvm install 22

  > 如安装 node 14，需要使用 nvm 1.1.12 或更早版本

- [VS Code](https://code.visualstudio.com/Download)

- [JetBrains Toolbox App](https://www.jetbrains.com/zh-cn/toolbox-app/)

  - 安装 WebStorm
  - 安装 CLion

- [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases)

- Syncthing GUI 一直使用[SyncTrayzor](https://github.com/canton7/SyncTrayzor) 作者不维护了，尝试新的[syncthingtray](https://github.com/Martchus/syncthingtray)，版本有点多，目前使用的是 syncthingtray-1.7.8-x86_64-w64-mingw32.exe.zip
- [HbuilderX](https://www.dcloud.io/hbuilderx.html)

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

- [滴答清单](https://dida365.com/download)

- [Logi Options+](https://support.logi.com/hc/zh-cn/articles/4418699283607-Logi-Options)

- [7zip](https://www.7-zip.org/)

- [Microsoft 365](https://account.microsoft.com/services/) 需要订阅

- [iCloud](https://apps.microsoft.com/detail/9pktq5699m62?hl=zh-cn&gl=CN)

- [Docker](https://www.docker.com/)

- [Caesium](https://saerasoft.com/caesium#downloads) 图片压缩

### winget

Windows 11 已经自带 winget

```sh
winget -v
```

> v1.10.390

- [PowerToys](https://github.com/microsoft/PowerToys)

```sh
winget install Microsoft.PowerToys -s winget
```

```sh
winget install qBittorrent
```

### scoop

https://scoop.sh/

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

```sh
scoop bucket add extras
```

```sh
scoop install sourcegit
scoop install pnpm
scoop install yarn
```

### UniGetUI

[UnigetUI 商店地址](https://apps.microsoft.com/detail/xpfftq032ptphf?hl=zh-CN&gl=CN)

[UnigetUI Github 地址](https://github.com/marticliment/UnigetUI)

## BitLocker

[查找 BitLocker 恢复密钥](https://go.microsoft.com/fwlink/?linkid=2165066) 或 https://aka.ms/myrecoverykey
