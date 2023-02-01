# novel-reader

This is a novel reader frontend SPA demo.

## 开发说明

- npm install 安装依赖
- npm run start-backend 运行服务端
- npm run start-frontend 运行客户端
- npm run build 打包客户端代码
- npm run test 测试

## 项目结构

### 整体结构
~~~
├── README.md
├── backend 后端代码
├── dist 打包后的后端文件
├── build 打包后的前端代码
├── docs 文档
├── example 案例
├── img 图片资源
├── node_modules 第三方依赖
├── novel-server.log 后端日志
├── public 公共文件
└── src 前端代码
~~~

### 文档结构

~~~
├── backend.md 后端文档
├── change.md 更新日志
├── frontend.md 前端文档
├── issues.md 开发问题及解决
└── product.md 产品文档
~~~


### 前端结构

~~~
├── App.js 项目主文件
├── api 接口
│   └── local-api.js
├── common 公共组件
│   ├── icons.jsx
│   ├── scroll-top-button
│   ├── vip-button
│   └── vip-dialog
├── css 公共样式
│   ├── App.css
│   ├── common.css
│   └── font.css
├── index.js 入口文件
├── main 主页
│   ├── folded-icon 折叠设置栏图标
│   ├── long-page 长页面展示
│   └── short-page 分页展示
├── navs 左侧导航栏
│   ├── add-novel-dialog
│   │   ├── load-from-local.jsx
│   │   └── load-from-server.jsx
│   ├── nav-body.jsx
│   ├── nav-footer.jsx
│   └── nav-header.jsx
├── settings 右侧设置栏
│   ├── advance-settings 高级设置
│   │   ├── advance-theme-settings.jsx
│   │   ├── color-settings.jsx
│   │   ├── font-settings.jsx
│   ├── basic-settings 基本设置
│   │   ├── font-settings.jsx
│   │   └── theme-settings.jsx
│   ├── constants.js
├── test 单元测试
└── utils 工具函数
    ├── example.json 实例小说文件
    └── index.js
~~~

### 后端结构

~~~
├── app.js 入口文件
├── connect.js 功能函数（暂不支持）
├── db-helper.js 数据库函数
├── http-server.js 后端路由
├── logger.js 日志函数
└── sql
    └── mysql.sql 数据库文件
~~~
