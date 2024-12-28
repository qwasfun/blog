# curl 使用

```shell
curl -A 'App/2.19.0 (iPhone; iOS 18.1.1; Scale/3.00)' --create-dirs -C - https://... -o 计算机/数据结构-导学.mp4
```

- `-A` 设置 User-Agent
- `--create-dirs` 创建文件夹
- `-C -` 断点续传
- `-o` 指定文件名
