# 1.阅读器功能说明

## 1.1 离线模式

核心功能是纯文本小说阅读应用，包括用户上传小说，分章节视图，分页面视图，自定义页面样式（文字颜色，文字粗细，整体色调，背景颜色），支持了很多可爱的卡通背景图片。

整体界面左中右布局

左侧导航栏：支持本地上传，或者在线搜索文档，并以列表形式展示；另一个 tab 是不同章节的树状图展示

中间阅读栏：预览模式（全页模式，分页模式，全屏模式）

右侧设置栏：可以切换 tab，分别是基本设置和高级设置

![](./screenshots/0.7-06.png)


## 1.2 在线模式

在离线模式基础上，1.0 版本支持用户操作：用户登录，用户注册，后台管理等功能；支持小说操作：在线搜索小说，下载小说，上传小说等功能。

![](./screenshots/0.7-05.png)



## 1.3 细节功能

左侧切换大纲和分页，右侧设置基本样式和阅读模式。

![](./screenshots/0.5-05.png)



设置栏可以支持拖动改变宽度，效果如下

![](./screenshots/0.2-06.gif)


点击下方派蒙，可以返回到顶部

![](./screenshots/0.3-01.gif)

不同主题原神主题色系

![](./screenshots/0.2-04.png)

支持本地上传到数据库

![](./screenshots/0.7-01.png)

支持初步用户登录和验证

![](./screenshots/0.5-02.png)

支持全屏模式和快捷键阅读

![](./screenshots/0.2-05.png)

支持不同权限管理

![](./screenshots/0.2-03.png)

其他具体实现和项目排期比较多，所以放在线上了

链接：https://cloud.seatable.cn/dtable/external-links/7995693695bc430db4f3/

## 1.4 未来功能展望

这里是表格中待完成任务列举出来

### 1.4.1 前端功能扩展

[前端] 报错信息优化

[前端] 背景水印

[前端] 本地存储阅读记录

[前端] 登录页面单页面

[前端] 支持多页面

[前端] 分页分章节

[前端] 付费界面改进

[前端] 界面按钮组件主题色统一

[前端] 使用帮助

[前端] 大文件性能问题

[前端] 支持多语言切换

[前端] 支持图片验证码

[前端] 左侧侧边栏支持隐藏

[前端] 左侧支持搜索

[前端] React hooks 优化全部的类组件

[前端] react-redux 或者 mobx 实现状态管理

[前端] token 存储在本地

[前端] TS 语言重构项目

[前端] VUE 语言重构项目

### 1.4.2 后端功能扩展

[后端] 代码分离

[后端] 服务器性能问题

[后端] 搜索逻辑优化

[后端] 微信扫码登录

[后端] 下载次数和时间统计

[后端] 用户密码数据库加密

[后端] express 框架构建

[后端] express 优化

[后端] flask 框架重构项目

### 1.4.3 产品功能调研

[产品] 调研其他产品的界面

[产品] 界面统计

[产品] 云服务器调研

[产品] 支持不同版本

[产品] 支持导出

[产品] 支持导入导出 pdf

[产品] 支持二维码分享

[产品] 支持付费功能

[产品] 支持移动端界面

如果是离线状态，打开对话框，提示”网络连接失败，以离线模式进行预览“。如果是在线状态，打开对话框，提示”用户登录或注册“，如果登录不正常，就是游客模式。如果登录正常，根据数据库判断，是免费版本，还是 VIP 账户，还是 admin 账户。

模式和权限列表，目前支持离线模式，免费模式。

| 模式     | 字段    | 网络状态 | 登录状态 | 本地上传 | 小说数量 | 在线查询 | 高级设置 | 用户管理 |
| -------- | ------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 离线模式 | offline | 断网     | 未登录   | √        | 3        | x        | x        | x        |
| 游客模式 | tourist | 联网     | 未登录   | √        | 3        | x        | x        | x        |
| 免费模式 | free    | 联网     | 已登录   | √        | 10       | x        | x        | x        |
| VIP 模式 | vip     | 联网     | 已登录   | √        | 不限     | √        | √        | x        |
| 管理     | admin   | 联网     | 已登录   | √        | 不限     | √        | √        | √        |

### 1.4.4 大数据和推荐功能扩展

[后端] 根据用户阅读列表，使用推荐算法，给用户推荐想要的小说

### 1.4.5 用户调研和反馈

[测试] 全部功能样式测试

[文档] 完善使用文档

[文档] 注释分支

[运营] 线上反馈

限于时间和精力，第一版目前先做到这里，后续再完善其他功能