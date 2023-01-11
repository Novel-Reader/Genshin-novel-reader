# 问题记录

1. 某些 css 文件不生效

检查文件路径没有问题。把这部分代码拷贝到其他能用的代码中，不生效，检查是类名写错了。

2、reactstrap 样式不生效

没有引入 bootstrap.min.css 类

3、前端 3000 端口，向后端 8081 端口，请求跨域

目前后端设置允许跨域

~~~js
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});
~~~

4 数据库端口号

默认 mysql 的端口号是 3306 端口，如果本地装有多个 mysql 数据库，例如 docker 内部也跑的一个，可能造成另一个无法正常启动

实际环境中不可能有两个 mysql 在不同的端口跑。所以可以本地只开发一个项目，或者临时改一下数据库的端口号等


5 node 不支持 ES6 语法

运行服务前，需要用 babel 编译成 es5 后才能执行
