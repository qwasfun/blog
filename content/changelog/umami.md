# 添加 Umami

Umami 是开源、隐私友好型的 Web 统计分析工具，不使用cookie，不收集或存储个人数据。

Fork [umami](https://github.com/umami-software/umami)

## Vercel 部署 Umami

数据库我用的是 neon，部署时在 Vercel 添加环境变量 `DATABASE_URL` 即可

```bash
DATABASE_URL=postgresql://neondb_owner:npg_*********is@ep-****-****-****-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 添加跟踪代码

在 layout.tsx 页面添加跟踪代码

```ts
<Script
defer
src="https://um.qwas.fun/script.js"
data-website-id="7c35ddc6-cc59-497e-be6a-5b2c0fea8937"
/>
```

## 排除自己的访问

[文档链接](https://umami.is/docs/exclude-my-own-visits)

添加设置

```
localStorage.setItem('umami.disabled', 1);
```

移除设置

```
localStorage.removeItem('umami.disabled');
```

[查看报告](https://um.qwas.fun/share/3a9QTdWn8TCLiCSv/qwas.fun)
