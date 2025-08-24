---
title: git
publishedAt: 2024-12-08
summary:
---

内容来自 _Git：Mastering Version Control_

《Git：Mastering Version Control》 Ferdinando Santacroce Aske Olsson Rasmus Voss Jakub Narębski

![Git Mastering Version Control](../../public/static/2024/12/Git-Mastering-Version-Control.jpg)

## git config

```sh
git config --list
```

```sh
git config user.name "Aske Olsson"
git config user.email "askeolsson@example.com"
```

### 指定编辑器

```sh
git config --global core.editor vim
```

```sh
git config --global core.editor code
```

### 一些有用得 alias:

```sh
git config <level> alias.<alias name> '<your sequence of git commands>'
```

```sh
git config --global alias.unstage 'reset HEAD --'
git config --global alias.undo 'reset --soft HEAD~1'
git config --global alias.cm 'commit -m'
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.tree 'log --graph --decorate --pretty=oneline --abbrev-commit'
git config --global alias.graph "log --all --graph --pretty=format:'%Cred%h%Creset -%C (yellow)%d%Creset %s %Cgreen(%ci) %C(bold blue)<%an>%Creset'"
```

### 自定义设置

这些设置对 Git 本身没有影响，但是对脚本或构建工具很有用

```sh
git config my.own.config "Whatever I need"
```

删除配置条目

```sh
git config --unset my.own.config
```

## checkout

```sh
git checkout –
```

checkout 上一次分支

## diff

```sh
git diff main..dev
```

`git diff <source branch> .. <target branch>`

对比分支差异

## log

```sh
git log main..dev
```

对比分支 commit message

## remote

```sh
git remote show origin
```

```sh
git remote add upstream https://github.com/<original-owner>/<original-repository>.git
```

```sh
git remote add origin <remote-repository-url>
git remote add upstream https://github.com/octocat/Spoon-Knife.git
```

## autocorrect

拼写自动校正

```sh
git config --global help.autocorrect 10
```

> 中止自动校正 `Ctrl + C`

## blame

git blame

## archive

git archive HEAD --format=zip --output=../headbck.zip

## bundle

git bundle create ../repo.bundle master
