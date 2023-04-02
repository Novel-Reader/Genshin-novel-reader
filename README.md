# 原神背景小说阅读器 novel reader with Genshin background

## 案例 Demo

[在线案例](https://michael18811380328.github.io/novel-demo/index.html) [Live Demo](https://michael18811380328.github.io/novel-demo/index.html)

一个使用 React 和 Express 框架，结合 MySQL 数据库构建的图书阅读+查询系统。

实现本地小说阅读上传、在线小说阅读下载和管理流程，支持用户自定义阅读器的外观和功能。

A book reading and query system built using React and Express framework combined with MySQL database.

Realize the local novel reading, local novel upload, online novel reading, novel download and management process, and support users to customize the appearance and function of the reader.

![](./docs/screenshots/0.7-06.png)

![](./docs/screenshots/0.7-05.png)

## 配置 Setting

后端配置文件

`backend/config/config.json`

```json
{
  "host": "数据库主机号",
  "user": "数据库用户名",
  "password": "数据库密码",
  "database": "数据库名",
  "port": "数据库端口号，默认 3306"
}
```

前端配置文件

`setting.json`

```json
{
  "server": "后端服务器端口号",
  "mode": "模式，可以设置 online 或者 offline"
}
```

## 开发 Development

安装依赖 Install dependencies:

```bash
npm install
```

开启服务器 Run backend server:

```bash
npm run start-backend
```

在 localhost:3000 端口开启客户端 Run frontend page on localhost:3000 :


```bash
npm run start-frontend
```

运行单元测试 Run tests:

```bash
npm run test
```
