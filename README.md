# 原神背景小说阅读器 novel reader with Genshin background

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

1.0 版本及之前版本，客户端和服务器代码都维护在本仓库。

1.0 版本后，服务端代码单独迁移成一个项目 [novel-reader-express-server](https://github.com/Novel-Reader/novel-reader-express-server)
