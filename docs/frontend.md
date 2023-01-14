## 前端技术点

### 数据管理

1、内容数据：支持本地上传，或者从服务器加载两种模式。

如果可以连接到服务器，支持从服务器中查找并加载（目前支持全部加载，不支持部分分页加载）。

任何情况都可以本地上传，上传后以 state 形式保存在根组件（未来可以写入数据库）。

2、界面样式：支持自定义背景图片，背景色，字号，字体，文字颜色，行间隔，保存在浏览器中，使用页面样式渲染内容。

3、预览模式：不同的模式，界面渲染不同的组件（分页翻页，全部预览）

### 技术实现

1、前端框架：react 实现 UI 渲染

2、组件库：reactstrap 实现主要 UI 组件和样式，结合 react-select react-sweet-progress react-color 实现选择框，进度条，颜色编辑

3、状态管理：早期使用 state 管理状态，未来使用 react-redux 管理状态

4、移动端：使用 react-response 管理移动端效果

5、其他工具库：lodash axios deepcopy is-hotkey classnames watermark 等

