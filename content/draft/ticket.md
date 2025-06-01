# ticket

```sh
npx create-next-app@latest ticketing
```


```sh
npm i prisma @prisma/client react-icons
```

添加 sentry


```sh
npx @sentry/wizard@latest -i nextjs --saas --org qwas --project javascript-nextjs
```

访问
http://localhost:3000/sentry-example-page


配置

```ini
DATABASE_URL=postgresql://aws.neon.tech/neondb?sslmode=require
SENTRY_AUTH_TOKEN=123 # 根据 sentry 配置填写
```

```sh
npx prisma init
```

修改 `prisma\schema.prisma`，添加下面内容

```prisma
model Ticket {
  id          Int      @id @default(autoincrement())
  subject     String
  description String
  priority    String
  status      String
  createAt    DateTime @default(now())
  updateAt    DateTime @default(now())
}
```

```sh
npx prisma migrate dev --name init
```

```sh
npx prisma generate
```

package.json 添加

```js
"postinstall": "prisma generate"
```

prisma studio


```sh
npx prisma migrate dev --name add-user-model
```


```sh
npm i bcryptjs jose cookie
```

生成 AUTH_SECRET

```sh
openssl rand -base64 32
```

jwt.io


Auth Flow

- Log in with credentials
- Server checks credentials
- Store the token in cookie. You can also use local storage
- Send it with future requests
- Server verifies token and makes sure it is not altered


Low-Level Functions

- signAuthToken: Generates, encrypt and sign token with secret
- verifyAuthToken: Decrypt and verify token
- setAuthCookie: Set token to cookie
- getAuthCookie: Get token from cookie
- removeAuthCookie: Remove token cookie

High-Level Functions

- registerUser: Creates a new user
- loginUser: Authenticate user with credentials
- logoutUser: Calls removeAuthToken0, clears user
- getCurrentUser: Get the logged in user
