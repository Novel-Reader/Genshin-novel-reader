# 后端技术点

后端目前仅考虑最基本的增删改查，数据库也只使用一张表进行存储，不考虑性能的问题。

目前考虑 express 作为后端

https://www.expressjs.com.cn/starter/hello-world.html

https://michael18811380328.github.io/backend/site/nodejs/20-Node.js%20Express%20%E6%A1%86%E6%9E%B6/

https://michael18811380328.github.io/backend/site/nodejs/24-Node.js%20%E8%BF%9E%E6%8E%A5%20MySQL/

https://blog.csdn.net/weixin_41697143/article/details/119904196

### 第三方库

- body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
- cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
- multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

### 数据库设计

MySQL 作为数据库

数据库名：novel

数据库表1-用户表

~~~sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
~~~

数据库表2-文件表

### 存在的问题

一次性请求一本小说，是否有必要，用户也不可能一次性阅读完？也给服务器带来很大的压力。最好的办法是分页请求。这个服务端和数据库怎么实现？
