# NodeJS 配置代理和镜像

## 下载

[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

- nvm install 14
- nvm install 16
- nvm install 20
- nvm install 22
- nvm install 24
- nvm install lts

## 设置 nvm 代理镜像

<Tabs>
  <TabItem label="代理设置">
```sh
nvm proxy http://127.0.0.1:7890
```

```sh
nvm node_mirror https://cdn.npmmirror.com/binaries/node/
```

```sh
nvm npm_mirror https://cdn.npmmirror.com/binaries/npm/
```

  </TabItem>
  <TabItem label="还原设置">

```sh
nvm proxy none # 留空查看当前代理，使用 'none' 表示不使用代理
```

```sh
nvm node_mirror # 留空，使用默认的 https://nodejs.org/dist/
```

```sh
nvm npm_mirror  # 留空，使用默认的 https://github.com/npm/cli/archive/
```

  </TabItem>
</Tabs>

## 设置 npm install 代理

设置代理

<Tabs>
  <TabItem label="npm">
```sh
npm config set proxy http://127.0.0.1:7890
```
  </TabItem>
  <TabItem label="pnpm">
```sh
pnpm config set proxy http://127.0.0.1:7890
```
  </TabItem>
</Tabs>

设置镜像

<Tabs>
  <TabItem label="npm">
```sh
npm config set registry https://registry.npmmirror.com
```
  </TabItem>
  <TabItem label="pnpm">
```sh
pnpm config set registry https://registry.npmmirror.com
```
  </TabItem>
</Tabs>
