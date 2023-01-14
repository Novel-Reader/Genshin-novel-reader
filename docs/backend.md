## 后端技术点

### 服务器

使用 express 作为后端，目前仅考虑基本的 RestAPI 请求，不考虑高并发，负载均衡等性能问题。

https://www.expressjs.com.cn/starter/hello-world.html

https://michael18811380328.github.io/backend/site/nodejs/20-Node.js%20Express%20%E6%A1%86%E6%9E%B6/

https://michael18811380328.github.io/backend/site/nodejs/24-Node.js%20%E8%BF%9E%E6%8E%A5%20MySQL/

https://blog.csdn.net/weixin_41697143/article/details/119904196

### 第三方库

- body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据

- cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象

- multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据

### 数据库设计

MySQL 作为数据库，实现基本的增删改查，不考虑性能的问题

数据库名：novel

数据库表1-用户表

数据库表2-书籍表

```
mysqldump -u root -proot --skip-add-locks --skip-add-drop-table --skip-comments novel  > sql/mysql.sql
```
