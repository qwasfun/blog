# Windows wireshark 抓包

缘由：我的一个邮箱的密码忘记了，手机上的邮件客户端有登录这个邮箱，上面有记住登录密码，然而输入的登录密码并不能反显，于是想着通过抓包能否找到密码

## 电脑上设置

安装 wireshark

开启Windows 移动热点

![windows-as-mobile-hotspot](https://static.qwas.fun/public/2025/01/windows-as-mobile-hotspot.png)

[打开移动热点设置](ms-settings:network-mobilehotspot)

开启 wireshark，捕获 本地连接2

使用 `ip.src == 192.168.137.17` 过滤器查询，（在移动热点界面查看手机的 ip 地址）

> **到底选那个连接？**
>
> 使用window 移动热点的，列表中会有两个网卡有流量显示，而且流量会接近，先随便选一个，不行再选另一个 ![erha](https://static.qwas.fun/expressions/erha.png)

## 手机设置

在通讯录--通讯录账户--账号设置--高级--收件设置，关闭 使用SSL 选项，端口改为 143。回到邮件App收邮件

![ios-imap-settings](https://static.qwas.fun/public/2025/01/ios-imap-settings.png)

> 根据邮件服务商不同，收件协议可能是 pop 或 imap 中的一种，iOS会自动选择。常见 imap 端口是 143, pop 端口是110

![wireshark-imap](https://static.qwas.fun/public/2025/01/wireshark-imap.jpg)
