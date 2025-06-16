# Drizzle 使用

Drizzle 是一个 用于数据库的 TypeScript ORM 库

https://neon.tech/

创建一个云数据库

https://neon.new/

```sh
npm i drizzle-orm @neondatabase/serverless
```

```sh
npm i -D drizzle-kit
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

将 schema 生成为迁移文件

```sh
npx drizzle-kit generate
```

```sh
npx drizzle-kit migrate
```

此时 neon 数据库中，有了数据表结构。

在需要查询数据的的地方调用

```ts
import { db } from 'database/drizzle'
import { users } from 'database/schema'

const user = await db.select().from(users).where(eq(users.userId, userId))
```
