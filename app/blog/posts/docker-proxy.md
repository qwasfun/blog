---
title: Docker 代理配置
publishedAt: 2024-08-06
summary:
---

## 配置 daemon 的代理

使用 `docker pull` 拉去镜像时是通过 docker daemon （守护进程）执行

`cat /etc/docker/daemon.json`

```json
{
  "proxies": {
    "http-proxy": "http://127.0.0.1:7890",
    "https-proxy": "http://127.0.0.1:7890",
    "no-proxy": "*.aliyun.com,*.*.aliyuncs.com,127.0.0.0/8"
  }
}
```

Docker 的文档在这：[Configure the daemon to use a proxy](https://docs.docker.com/config/daemon/proxy/)

## 配置 container 代理

如果需要在容器中使用代理

cat ~/.docker/config.json

```json
{
  "proxies": {
    "default": {
      "httpProxy": "http://proxy.example.com:3128",
      "httpsProxy": "https://proxy.example.com:3129",
      "noProxy": "*.test.example.com,.example.org,127.0.0.0/8"
    }
  }
}
```

Docker 的文档在这：[Configure Docker to use a proxy server](https://docs.docker.com/network/proxy/#run-containers-with-a-proxy-configuration)

注意：默认 docker 网络是隔离，配置成 `localhost:7890` 在容器中是无法使用的。

有个小技巧，当本机处于局域网，将代理设置允许LAN共享，然后将代理地址设置为本机的局域网IP+端口，比如 `192.168.12.34:7890` （根据实际IP设置）。

## 给容器 Hosts文件追加地址

使用 `--add-host` 是实现给容器内设置 hosts

```sh
docker run --restart no -p 80:3000 -p 443:3001 -d -e DOCKER_MODS=linuxserver/mods:firefox-fonts --add-host=dl-cdn.alpinelinux.org=8.217.88.233 linuxserver/firefox:latest
```

[docker run --add-host](https://docs.docker.com/engine/reference/run/#network-settings)

docker compose 的写法

```yaml
extra_hosts:
  - 'somehost=162.242.195.82'
  - 'dl-cdn.alpinelinux.org=8.217.88.233'
```

[docker compose extra_hosts](https://docs.docker.com/compose/compose-file/05-services/#extra_hosts)

## SSH 端口转发

SSH 连接时使用端口转发，可以将本机访问代理共享给远程主机

```sh
# ssh -R 远程主机:端口:本机clash地址:clash端口
ssh -R 127.0.0.1:7890:192.168.6.1:7890 root@hostip
```
