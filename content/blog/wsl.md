# WSL 安装使用

## 前提条件

开启 Linux 子系统功能

控制面板 -> 程序 -> 启用或关闭 Windows 功能

勾选 “适用于 Linux 的 Windows 子系统”

![wsl preparation](https://static.qwas.fun/public/2025/06/wsl-preparation.png)

## 安装

```sh
wsl --install
```

<video controls autoPlay muted src="https://static.qwas.fun/public/2025/06/wsl-install.mp4" />

## 导入导出(备份恢复)

备份当前实例

```sh
wsl --export Ubuntu C:\wsl-backup\backup-ubuntu.tar.gz
# Unregister 取消注册分发版并删除根文件系统。
wsl --unregister Ubuntu
```

> `--unregister` 会删除对应文件系统，无法找回

## 装一个全新版本 Ubuntu

```sh
wsl --install -d Ubuntu
```

### 备份新安装的 Ubuntu

```sh
wsl --export Ubuntu-24.04 C:\wsl-backup\ubuntu-initial-2404.tar.gz
```

### 导入已备份的新 Ubuntu 系统

使用不同的名称和路径，将备份导入多次，可以实现多个实例共存

```sh
wsl --import <Distro> <InstallLocation> <FileName> [options]
```

```sh
wsl --import default-ubuntu C:\wsl\default-ubuntu C:\wsl-backup\backup-ubuntu.tar.gz
wsl --import qwas C:\wsl\qwas C:\wsl-backup\ubuntu-initial-2404.tar.gz
wsl --import work C:\wsl\work C:\wsl-backup\ubuntu-initial-2404.tar.gz
```

### 导出现有系统

```sh
wsl --export default-ubuntu C:\wsl-backup\default-ubuntu.tar.gz
wsl --export qwas C:\wsl-backup\qwas.tar.gz
wsl --export work C:\wsl-backup\work.tar.gz
```

```sh
wsl --import default-ubuntu C:\wsl\default-ubuntu C:\wsl-backup\default-ubuntu.tar.gz
wsl --import qwas C:\wsl\qwas C:\wsl-backup\qwas.tar.gz
wsl --import work C:\wsl\work C:\wsl-backup\work.tar.gz
```

## 运行指定版本

```sh
wsl -d default-ubuntu
```

```sh
wsl -d qwas
```

```sh
wsl -d work
```

---

## 其他

### 设置默认版本

```sh
wsl --set-default default-ubuntu
```

```sh
wsl --set-default qwas
```

### 修改用户

手动导入的 Ubuntu，默认以 root 用户登录，如指定用户，需要修改 `/etc/wsl.conf` 文件，加入下面内容

```ini
[user]
default=<username>
```

我的配置

```ini
[user]
default=dong
```

## 参考

[WSL 挂载多个 Ubuntu 系统\_wsl 多个子系统-CSDN 博客](https://blog.csdn.net/weixin_44286143/article/details/134047182)

[Installing multiple instances of Ubuntu in WSL2 | Mourtada.se](https://www.mourtada.se/installing-multiple-instances-of-ubuntu-in-wsl2/)
