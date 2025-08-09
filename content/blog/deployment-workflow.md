# 部署工作流记录

源代码托管在 GitHub，代码提交后触发 GitHub Action 执行 Cypress 测试。

## 数据库使用

目前是 Next.js 服务运行在 Vercel，数据库使用 neon 上 的 PostgreSQL

Neon 上的 PostgreSQL 支持分支功能，但是好像 “如何防止测试环境读写生产环境的数据” 做不了，因为创建的新分支不只是包含表结构，还包含数据。所以还是生产环境是一个数据库，测试环境一个数据库

main 分支部署使用

- Qwas-production

其他分支（包括本地调试，GitHub action, Dependabot bot, Vercel Preview ）使用

- Qwas-preview

## 仓库更新

content、public 目录下的内容的新增修改，直接 main 分支提交，本地预览，即时更新。

功能代码的修改创建新分支，发 Pull Request
