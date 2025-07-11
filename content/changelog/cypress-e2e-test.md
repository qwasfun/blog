# 集成 Cypress 端对端测试

1. 安装 Cypress
2. 编写测试用例
3. 集成 CI, 如 Github Action

## 安装 cypress

<Tabs>
<TabItem label="npm">

```sh
npm i -D cypress
```

</TabItem>
<TabItem label="pnpm">

```sh
pnpm add -D cypress
```

</TabItem>
</Tabs>

<Tabs>
<TabItem label="npm">

```sh
npx cypress install
```

</TabItem>
<TabItem label="pnpm">

```sh
pnpm exec cypress install
```

</TabItem>
</Tabs>

https://docs.cypress.io/app/get-started/install-cypress

## 图形界面运行测试用例

<Tabs>
<TabItem label="npm">

```sh
npx cypress open
```

</TabItem>
<TabItem label="pnpm">

```sh
pnpm exec cypress open
```

</TabItem>
</Tabs>

在界面选择 e2e test，cypress 会自动创建一部分配置文件和测试示例

<video controls autoPlay muted src="https://static.qwas.fun/public/2025/06/cypress-e2e-test-1.mp4"  />

## 命令行运行测试用例

<Tabs>
<TabItem label="npm">

```sh
npx cypress run
```

</TabItem>
<TabItem label="pnpm">

```sh
pnpm exec cypress run
```

</TabItem>
</Tabs>
