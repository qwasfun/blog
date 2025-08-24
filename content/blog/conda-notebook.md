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

[查看安装截图](../screenshot/anaconda)
