# FFmpeg 视频压缩

## 安装

```sh
scoop install ffmpeg
```

或

```
winget install ffmpeg
```

下载地址： https://www.ffmpeg.org/download.html

## 转换命令

```sh
ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4
```

- `-i` 指定输入文件。
- `-c:v libx264` 指定使用 H.264/AVC 编码器压缩视频。
- `-crf 23` 指定 CrF 值为 23，数值越大，视频质量越差。对于x264，默认值是23，取值范围 0-51，一般取值 17-28

https://trac.ffmpeg.org/wiki/Encode/H.264#a1.ChooseaCRFvalue

## Powershell 脚本

将 MOV 文件转换为 mp4，并保留原文件的 `创建时间` 和 `修改时间`

```ps1
Get-ChildItem -Filter *.MOV | ForEach-Object {
  $outFile = $_.FullName -replace '\.MOV$', '.mp4'
  ffmpeg -i $_.FullName -c:v libx264 -crf 23  $outFile
  (Get-Item -LiteralPath $outFile).CreationTime = $_.CreationTime
  (Get-Item -LiteralPath $outFile).LastWriteTime = $_.LastWriteTime
}
```

转换 mp4 （并重命名为 `原文件_compressed.mp4`）

```ps1
Get-ChildItem -Filter *.mp4 | ForEach-Object {
  $outFile = $_.FullName -replace '\.mp4$', '_compressed.mp4'
  ffmpeg -i $_.FullName -c:v libx264 -crf 23  $outFile
  (Get-Item -LiteralPath $outFile).CreationTime = $_.CreationTime
  (Get-Item -LiteralPath $outFile).LastWriteTime = $_.LastWriteTime
}
```

转换录屏文件 （RPReplay 开头的 mp4 文件）

> 会覆盖原文件

```ps1
Get-ChildItem -Filter RPReplay*.mp4 | ForEach-Object {
  $outFile = $_.FullName -replace '\.mp4$', '_c.mp4'
  ffmpeg -i $_.FullName  -c:v libx264 -crf 23  $outFile
  (Get-Item -LiteralPath $outFile).CreationTime = $_.LastWriteTime
  (Get-Item -LiteralPath $outFile).LastWriteTime = $_.LastWriteTime
  Remove-Item $_.FullName
  Rename-Item $outFile $_.FullName
}
```

重命名文件

```ps1
Get-ChildItem -Filter RPReplay*.mov | ForEach-Object {
  $outFile = $_.FullName -replace '\.mov$', '.mp4'
  Move-Item $_.FullName $outFile
}
```
