var http = require('http');//调用模块
var other = require('./new');//调用外部js,可以省略.js
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})//开始
	if(req.url!=='/favicon.ico'){//防止出现二次访问
		fun1(res);//调用本地的函数fun1
		other['fun2'](res);//多个函数的时候的表达式，还可以是other.fun2(res);
		other['fun3'](res);//属于字符串调用函数名
		res.end('');//结束，对应前面的writeHead
	}
}).listen(8000);//监听到8000端口

console.log('server running at http://127.0.0.1:8000/');


//定义本地函数
function fun1(res){
	console.log('i am fun1');//显示到terminal中的
	res.write('hello fun1');//显示到前端网页的
}