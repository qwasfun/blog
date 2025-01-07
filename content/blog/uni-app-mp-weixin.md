# uni-app + Vue3 版本开发微信小程序记录

请使用 20 或更新版本的 Node.js

## cli 创建项目

```sh
npx degit dcloudio/uni-preset-vue#vite uniapp-vue3-project
```

打印的日志

```md
C:\Users\dong\dev\template>npx degit dcloudio/uni-preset-vue#vite uniapp-vue3-project

> cloned dcloudio/uni-preset-vue#vite to uniapp-vue3-project
```

## 添加 vant

```sh
git submodule add https://github.com/youzan/vant-weapp.git src/wxcomponents/vant
```

page.json 中添加要用到的 vant 组件

```json
{
  "globalStyle": {
    "usingComponents": {
      "van-action-sheet": "/wxcomponents/vant/dist/action-sheet",
      "van-button": "/wxcomponents/vant/dist/button"
    }
  }
}
```

## 自定义 tabBar

参考

[基础能力 / 自定义 tabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)

[Tabbar 标签栏 - Vant Weapp](https://vant.pro/vant-weapp/#/tabbar)

## 降低 vue 版本

目前 uniapp 不支持最新版本 vue 3.x版本

```json
{
  "pinia": "^2.0.36",
  "vue": "3.3.13"
}
```

[状态管理 Pinia | uni-app官网](https://uniapp.dcloud.net.cn/tutorial/vue3-pinia.html)

## ESLint 和 prettier

> 通过 `npm create vue@latest` 创建项目并勾选上 ESLint 和 prettier ，然后把配置文件拷贝过来

```sh
npm i -D @eslint/js@^9.15.0 @vue/eslint-config-prettier@^10.1.0 eslint@^9.15.0 eslint-plugin-vue@^9.31.0 prettier@^3.3.3
```

```json
"@eslint/js": "^9.15.0",
"@vue/eslint-config-prettier": "^10.1.0",
"eslint": "^9.15.0",
"eslint-plugin-vue": "^9.31.0",
"prettier": "^3.3.3",
```

eslint 配置

eslint 配置文件 eslint.config.mjs，注意文件名 mjs 结尾，新版 eslint 需要用 import 语法

```js
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/src/wxcomponents/**',
    ],
  },
  {
    languageOptions: {
      globals: {
        WeixinJSBridge: 'readonly',
        wx: 'readonly',
        uni: 'readonly',
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 0,
    },
  },
  {
    files: ['src/**/*.vue', 'src/**/*.js'],
    rules: {
      'prefer-const': 2,
    },
  },
]
```

prettier 配置

.prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

## 配置 precommit hook

[prettier 文档](https://prettier.io/docs/en/precommit)

```sh
npx mrm@2 lint-staged
```

## 移除生产环境的 console.log

vite 已经自带移除 console.log 功能，需要在 vite.config.js 配置，[文档地址](https://cn.vitejs.dev/guide/env-and-mode)

定义环境变量时，需要以 `VITE_` 为前缀，

.env.development

```ini
# 开发环境配置
NODE_ENV='development'
VITE_APP_MODE='development'
```

.env.production

```ini
# 生产环境配置
NODE_ENV='production'
VITE_APP_MODE='production'
```

vite.config.js

```js
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  /*global process */
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [uni()],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: env.VITE_APP_MODE === 'production',
          drop_debugger: env.VITE_APP_MODE === 'production',
        },
      },
    },
  }
})
```
