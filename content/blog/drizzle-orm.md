# Drizzle ORM 使用

[Drizzle ORM](https://orm.drizzle.team/) 是一个 用于数据库的 TypeScript ORM 库

## 创建数据库

[Neon Serverless Postgres](https://neon.tech/)，提供免费的 Postgres 云数据库，使用云数据库的一大好处，避免繁复的数据库安装设置，网页上点一点，即可使用。

注册账号后，可以选择数据存放地区，我使用 AWS Asia Pacific 1 (Singapore), Region ID:ap-southeast-1，即 AWS 亚太地区（新加坡）

用 https://neon.new 还能创建一个临时的 Neon Postgres 云数据库（保留72小时），绑定账号后可以长期保留

临时数据库存放在 AWS Europe Central 1 (Frankfurt), Region ID: eu-central-1

## 安装依赖

```sh
npm i drizzle-orm @neondatabase/serverless
```

```sh
npm i -D drizzle-kit
```

## 初始化数据库连接

新建.env 文件，填入数据库地址（以下地址仅为示例，请填入实际地址）

```ini
DATABASE_URL=postgresql://neondb_owner:npg_abcdefghijkl@ep-abcdef-ghijkl-mnopqrst-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

新建文件 `databases/drizzle.ts`

```ts
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Init Neon Client
const sql = neon(process.env.DATABASE_URL)

// Init Drizzle
export const db = drizzle(sql)
```

## 定义数据结构

新建文件 `databases/schema.ts`

```ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  message: text('message').notNull(),
  reply: text('reply').notNull(),
  createAt: timestamp('created_at').defaultNow().notNull(),
})

export const users = pgTable('users', {
  userId: text('user_id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createAt: timestamp('created_at').defaultNow().notNull(),
})

// Type inference for Drizzle queries
export type ChatInsert = typeof chats.$inferInsert
export type ChatSelect = typeof chats.$inferSelect

export type userInsert = typeof users.$inferInsert
export type userSelect = typeof users.$inferSelect
```

## 配置 drizzle-kit

根目录下新建 `drizzle.config.ts`

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './database/schema.ts',
  // out:'/drizzle'
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

## 生成并执行迁移

将 schema 生成为迁移文件

```sh
npx drizzle-kit generate
```

```sh
npx drizzle-kit migrate
```

此时 neon 数据库中，有了数据表结构。

## 数据库查询

在需要查询数据的的地方调用

```ts
import { db } from 'database/drizzle'
import { users } from 'database/schema'

const user = await db.select().from(users).where(eq(users.userId, userId))
```
