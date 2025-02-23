# Tailwind CSS v4

- tailwindcss
- bootstrap
- ant design
- materail css

## component libraries

- tailwind ui
- handless ui
- shadcn ui

对比行类样式

1. 行类样式不能使用伪类选择器，比如 `:first` ,`last-child`
2. 行类样式不能使用媒体查询

## Tailwind

### Import

```css
@import 'tailwindcss';
```

### Dark Mode

`dark:`

```css
@custom-variant dark (&:where(.dark, .dark *));
```

https://play.tailwindcss.com/RbcP3RqzqJ?layout=horizontal

### Custom Style & Reusability

```css
body {
  background-color: #10172a;
}

@layer base {
  h3 {
    @apply text-base font-medium tracking-tight text-slate-900 dark:text-white;
  }
}

@layer components {
  .card {
    @apply m-10 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-black;
  }
}

@utility flex-center {
  @apply flex justify-center items-center;
}
```

### Fluid text

```html
<p class="text-[min(10vw,70px)]">Something Fluid</p>
```

### File

```html
<label class="my-4 block">
  <input
    type="file"
    class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
  />
</label>
```

### Highlight

```html
<div class="selection:bg-green-400 selection:text-white">
  <p>Hello World</p>
</div>
```

### less javascript

```html
<details class="open rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10">
    <summary class="text-sm leading-6 font-semibold text-slate-900 select-none dark:text-white">Why do they call it Ovaltine?</summary>
    <div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
      <p>The mug is round</p>
    </div>
  </details>
</div>
```

https://play.tailwindcss.com/xTCp8Z4JwL

https://www.youtube.com/watch?v=6biMWgD6_JY

一个学CSS grid 布局的游戏 Grid Garden https://cssgridgarden.com/#zh-cn
