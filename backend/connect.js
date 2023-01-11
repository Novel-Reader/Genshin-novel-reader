// https://michael18811380328.github.io/backend/site/nodejs/24-Node.js%20%E8%BF%9E%E6%8E%A5%20MySQL/
// 连接数据库

// // 增加数据
// var mysql = require('mysql');
// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123456',
// 	port: '3306',
// 	database: 'test'
// });
// connection.connect();
// var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN'];
// //增
// connection.query(addSql, addSqlParams, function(err, result) {
// 	if (err) {
// 		console.log('[INSERT ERROR] - ', err.message);
// 		return;
// 	}
// 	//console.log('INSERT ID:',result.insertId);
// });
// connection.end();

//————————————————————————————————————————
// POST
// var express = require('express'); var app = express(); var bodyParser = require('body-parser');  // 创建 application/x-www-form-urlencoded 编码解析 var urlencodedParser = bodyParser.urlencoded({ extended: false })  app.use('/public', express.static('public'));  app.get('/index.html', function (req, res) {   res.sendFile( __dirname + "/" + "index.html" ); })  app.post('/process_post', urlencodedParser, function (req, res) {    // 输出 JSON 格式   var response = {       "first_name":req.body.first_name,       "last_name":req.body.last_name   };   console.log(response);   res.end(JSON.stringify(response)); })  var server = app.listen(8081, function () {   var host = server.address().address  var port = server.address().port   console.log("应用实例，访问地址为 http://%s:%s", host, port)  })


// 文件上传
//————————————————————————————————————————
// var express = require('express');
// var app = express();
// var fs = require("fs");
// var bodyParser = require('body-parser');
// var multer = require('multer');
// app.use('/public', express.static('public'));
// app.use(bodyParser.urlencoded({
// 	extended: false
// }));
// app.use(multer({
// 	dest: '/tmp/'
// }).array('image'));
// app.get('/index.html', function(req, res) {
// 	res.sendFile(__dirname + "/" + "index.html");
// })
// app.post('/file_upload', function(req, res) {
// 	console.log(req.files[0]);
// 	// 上传的文件信息    
// 	var des_file = __dirname + "/" + req.files[0].originalname;
// 	fs.readFile(req.files[0].path, function(err, data) {
// 		fs.writeFile(des_file, data, function(err) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				response = {
// 					message: 'File uploaded successfully',
// 					filename: req.files[0].originalname
// 				};
// 			}
// 			console.log(response);
// 			res.end(JSON.stringify(response));
// 		});
// 	});
// })
// var server = app.listen(8081, function() {
// 	var host = server.address().address
// 	var port = server.address().port
// 	console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })

//   static listOperation(uuid) {
//     const sql = `SELECT operation, op_id FROM operation`;
//     return new Promise((resolve, reject) => {
//       DBHelper(sql, (err, results) => {
//         if (err) {
//           logger.error(err); 
//           reject(err);
//           return;
//         }
//         resolve(results);
//       });
//     });
//   }
