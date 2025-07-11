# 照片管理工具 - immich

## 目录配置

系统盘是 SSD，空间有限，想着把数据库放在 SSD，相册库放在 HDD 里。

`/dev/sda1` 系统盘 SSD 256GB

`/dev/sda2` 数据盘 HDD 1TB

![immich server df](https://static.qwas.fun/2025/07/immich-server-df.png)

将 `/dev/sda2` 挂载到 `/srv/data`

将 `/srv/data/immich-app-library` 绑定挂载到 `/srv/immich-app-site/library`

```bash
sudo mkdir -p /srv/data/immich-app/library
sudo mkdir -p /srv/immich-app-site/library
sudo mount --bind /srv/data/immich-app/library /srv/immich-app-site/library
```

### 开机自动挂载

查找 /dev/sda2 对应的 UUID

```bash
sudo blkid
```

编辑 `/etc/fstab`

```bash
sudo vi /etc/fstab
```

添加下面两行内容

```ini
UUID="E062236362233E22"  /srv/data ntfs defaults 0 2
```

```ini
/srv/data/immich-app/library  /srv/immich-app-site/library  none  bind  0  0
```

> fs_pass 根路径设置为 1，其他路径设置为 2

> 使用路径也可以，但用 UUID 可能更好点
>
> ```
> /srv/data  /srv/data ntfs defaults 0 2
> ```

## 应用层文件目录路径

配置文件目录：`/srv/immich-app-site`

相册库 UPLOAD_LOCATION：`/srv/immich-app-site/library`

数据库 DB_DATA_LOCATION：`/srv/immich-app-site/postgres`

```sh
/srv/immich-app-site
├── docker-compose.yml
├── .env
├── .git
├── .gitignore
├── library
├── postgres
└── README.md
```
## 运行

```bash
cd /srv/immich-app-site
git clone https://github.com/qwasfun/immich-app-site.git .
docker compose up -d
```

## 页面截图

![immich welcome](https://static.qwas.fun/2025/07/immich-welcome.png)

![immich home](https://static.qwas.fun/2025/07/immich-home.png)
