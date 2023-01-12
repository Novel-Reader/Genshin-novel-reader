# 产品文档

## 界面和功能

目标纯文本阅读器单页面应用（用途是阅读小说）

整体界面左中右布局

左侧是书库：支持本地上传，或者在线搜索文档，并以列表形式展示；另一个 tab 是不同章节的树状图展示

中间是预览：预览模式（整体滚动模式，分页模式，全屏模式）

右侧是设置栏：可以切换 tab，分别是基本设置和高级设置。基本设置是小白设置（护眼、关灯； 文字：大中小）高级设置是专业的设置（背景色，字号，字体等）

因为之前没有写过纯小说的产品，所以参考，整体颜色和功能参考：https://m.51xs.cc/39/39455/20761468.html

- 侧边栏可以加一个小火箭，返回到界面顶部，这个是一个缓动动画效果，看一下怎么实现


- 支持背景水印等 watermark 配置项

```
"watermark-dom": "^1.0.0",

import watermark from 'watermark-dom';

if (enableWatermark) {
  watermark.init({
    watermark_txt: `${siteName} ${userNickName}`,
    watermark_alpha: 0.075
  });
}
```

- 支持二维码分享，扫码打开当前的网址
```
"qrcode.react": "^1.0.1",

import QRCode from 'qrcode.react';
<QRCode value={link} size={128} />
```

- 最后可以支持色调是原神主题色，然后可以选择背景色（按钮等需要定制）这个需要考虑背景图片的拉伸等问题



## 实现阶段

1、实现基本框架和数据，支持一种模式

2、支持不同模式切换，不同颜色设置

3、支持移动端预览设置等

4、支持后端数据库？

5、支持选中笔记，互动等操作，

6、实现服务端提供数据

7、入口文件，可以改成几个模式：用户注册，用户登录，阅读页面，笔记界面，评论界面等。重点是阅读器，其他的用户登录界面以后有机会再说。

8、支持原神主题色

背景图（使用Julia的图片）文档设置 0.85 左右的透明度

https://julia-1994.github.io/images/KamisatoAyaka/02.jpg

配色(目前6种)

## 开发说明

- npm install 安装依赖

- npm start 本地调试前后端

- npm run start-frontend 本地调试前端

- npm run start-backend 本地调试后端

- npm build 打包测试（未来拷贝到个人博客下，可以作为在线阅读器玩一下）
