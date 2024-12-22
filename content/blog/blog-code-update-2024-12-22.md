# Blog Code Update 2024-12-22

## git log 跟踪文章的发表时间和更新时间

查看文件的所有提交记录

```shell
git log --pretty="%ai" README.md
```

查看文件的所有提交记录，包含重命名文件的记录

```shell
git log --follow --pretty="%ai" README.md
```

## Javascript 代码调用 shell

使用 `cross-spawn` [包](https://www.npmjs.com/package/cross-spawn) 执行 shell 命令，spawn 既支持异步执行，也支持同步执行，已有代码逻辑都是同步的，这里通过 `spawn.sync()`
同步执行了

```js
import { spawn } from 'cross-spawn'
import { basename, dirname } from 'path'

let file = 'README.md'
const child = spawn.sync(
  'git',
  ['log', '-1', '--follow', '--pretty="%ai"', basename(file)],
  { cwd: dirname(file) }
)

const output = child.stdout.toString()

console.log(output) // "2024-06-10 18:09:22 +0800"
```

## 配置静态生成

在 Next 中 dev 或 build 命令下可以获取到 Git 仓库信息，而在 `next start` 貌似就读取不到 Git 仓库信息了，所以要在 build 阶段将文章内容生成为静态资源，通过 `generateStaticParams` [文档地址](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params) 在构建时 静态生成路由，而不是在请求时按需生成。

```js
export async function generateStaticParams() {}
```

## Vercel 的 git clone

Vercel 部署时， `git clone` 默认添加 `--depth=10`, 也就是默认只拉取最近10次的 commit
记录 [Vercel 的文档](https://vercel.com/docs/deployments/configure-a-build#configuring-a-build)

环境变量 `VERCEL_DEEP_CLONE` 为 `true` 拉取全部 Git 历史记录
