var http = require('http')
var User = require('./User')//这里引入的是js文件，可省略.js
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})//开始
	if(req.url!=='/favicon.ico'){//防止出现二次访问
		user = new User(1,'张三',20);//new 的后面的函数名为前面var的名称，采用的是数据结构的方式，将变量带进去
		user.lib();
		res.end('');//结束，对应前面的writeHead
	}
}).listen(8000);//监听到8000端口

console.log('server running at http://127.0.0.1:8000/');
