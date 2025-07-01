# 添加 umami

Fork [umami](https://github.com/umami-software/umami)

使用 vercel 部署

环境变量添加 `DATABASE_URL`，数据库使用 neon

```bash
DATABASE_URL=postgresql://neondb_owner:npg_*********is@ep-****-****-****-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

在 layout 页面添加跟踪代码

```ts
<Script
defer
src="https://um.qwas.fun/script.js"
data-website-id="7c35ddc6-cc59-497e-be6a-5b2c0fea8937"
/>
```
