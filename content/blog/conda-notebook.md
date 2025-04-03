# Anaconda Notebook 使用

## 使用

创建环境

```sh
conda create --name test-program
```

激活环境

```sh
conda activate test-program
```

安装 notebook

> 作为依赖，jupyter 会被自动安装

```sh
conda install notebook
```

开启 jupyter notebook 服务

```sh
jupyter notebook
```

退出当前环境

```sh
conda deactivate
```

## 其他

查看 conda 版本

```sh
conda --version
```

查看 conda 已安装的依赖

```sh
conda list
```

列出环境

```sh
conda env list
```

创建环境时，指定 python 版本

```sh
conda create --name example312 python=3.12
```

导出环境

```sh
conda env export > example312.yml
```

导入环境

```sh
conda env create --file=example312.yml --name example312-2
```

> --file, -f 指定配置文件路径
>
> --name, -n 环境名称

删除环境

```sh
conda env remove --name example312-2
```

视频教程：[Get Started with Anaconda](https://freelearning.anaconda.cloud/get-started-with-anaconda)

## anaconda 下载安装

下载地址：https://www.anaconda.com/download

安装截图：

[Anaconda 安装截图 1](https://static.qwas.fun/2025/04/03/anaconda-install-1.png)

[Anaconda 安装截图 2](https://static.qwas.fun/2025/04/03/anaconda-install-2.png)

[Anaconda 安装截图 3](https://static.qwas.fun/2025/04/03/anaconda-install-3.png)

[Anaconda 安装截图 4](https://static.qwas.fun/2025/04/03/anaconda-install-4.png)

[Anaconda 安装截图 5](https://static.qwas.fun/2025/04/03/anaconda-install-5.png)

[Anaconda 安装截图 6](https://static.qwas.fun/2025/04/03/anaconda-install-6.png)

[Anaconda 安装截图 7](https://static.qwas.fun/2025/04/03/anaconda-install-7.png)

[Anaconda 安装截图 8](https://static.qwas.fun/2025/04/03/anaconda-install-8.png)

[Anaconda 安装截图 9](https://static.qwas.fun/2025/04/03/anaconda-install-9.png)
