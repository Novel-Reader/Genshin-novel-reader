## 前端技术点

技术文档，单独拿出来

### 数据管理

1、内容数据：本地上传，或者从服务器端加载数据（目前支持全部加载，不支持部分加载）除非做到服务端分页加载。上传后目前以 state 形式保存在界面，未来可以写入数据库。

2、界面样式：页面的背景色，字号，字体，文字颜色，行间隔等，保存在 state 中，渲染界面

3、预览模式：不同的模式，界面渲染不同的组件（分页，还是全部预览等）

### 技术实现

1、react 实现 UI 渲染

2、reactstrap 实现 UI 组件和样式 结合 react-select react-sweet-progress

3、早期使用 state 管理状态，未来使用 react-redux 管理状态

4、使用 react-response 管理移动端效果

5、其他工具库：lodash axios deepcopy is-hotkey classnames watermark 等（简单介绍第三方库的作用）

### 存在的问题

1、多篇文档加载后，浏览器中 string dom 特别多，界面交互不流畅（例如另一个，一次性渲染600题目，造成界面加载卡顿）
