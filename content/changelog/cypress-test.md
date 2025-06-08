# cypress 端对端测试

1. 安装 cypress
2. 编写测试用例
3. 集成 CI 如：Github Action

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

https://docs.cypress.io/app/get-started/install-cypress

## 编写测试用例

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

<video controls autoplay muted src="https://static.qwas.fun/public/2025/06/cypress-e2e-test-1.mp4"  />

