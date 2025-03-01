# 原神背景小说阅读器 Genshin Novel Reader

## 案例 Demo

[在线案例](https://michael18811380328.github.io/novel-demo/index.html)

[Live Demo](https://michael18811380328.github.io/novel-demo/index.html)

一个使用 React 和 Express 框架，结合 MySQL 数据库构建的图书阅读+查询系统。

实现本地小说阅读上传、在线小说阅读下载和管理流程，支持用户自定义阅读器的外观和功能。

A book reading and query system built using React and Express framework combined with MySQL database.

Realize the local novel reading, local novel upload, online novel reading, novel download and management process, and support users to customize the appearance and function of the reader.

![](./screenshots/0.7-06.png)

![](./screenshots/0.7-05.png)

## 文档 Docs

[文档网站](https://novel-reader.github.io/)

[v 1.0](https://novel-reader.github.io/v1/00-introduction/)

[v latest](https://novel-reader.github.io/latest/00-introduction/)

## 配置 Setting

默认配置文件 `/src/setting.json` 参数说明

```json
{
  "server": "服务器端口号, 例如 http://127.0.0.1:8081",
  "mode": "阅读器模式，online 或者 offline"
}
```

在这个目录中，新建一个 `/src/setting.local.json` 配置文件，可以覆盖默认配置项。

## 开发 Development

安装依赖 Install dependencies:

```bash
npm install
```

在 localhost:3000 端口开启客户端 Run frontend page on localhost:3000 :

```bash
npm run start
```

运行单元测试 Run tests:

```bash
npm run test
```

## 说明 More

原神小说阅读器的每个组件在 Github 上有独立的源代码库。

- 小说阅读器（javascript版本）：https://github.com/Novel-Reader/Genshin-novel-reader
- 小说服务器：https://github.com/Novel-Reader/Genshin-novel-reader-express-server
- 小说阅读器（typescript 版）：https://github.com/Novel-Reader/novel-reader-ts
- 文档源代码：https://github.com/Novel-Reader/Genshin-novel-reader-doc
- 文档编译后代码：https://github.com/Novel-Reader/Novel-Reader.github.io

在1.0版本之前，服务器代码和阅读器代码都保存在一个存储库中，即 https://github.com/Novel-Reader/Genshin-novel-reader。

1.0之后，主代码分为两部分：前端阅读器代码 https://github.com/Novel-Reader/Genshin-novel-reader 和后端服务器代码 https://github.com/Novel-Reader/Genshin-novel-reader-express-server。同时支持了前端 typescript 版本 https://github.com/Novel-Reader/novel-reader-ts。https://github.com/Novel-Reader/novel-reader-express-server

