/* 取出url里的路由字符串  */


var http = require('http');//调用模块
var url = require('url');
var router = require('./router');
// var exception = require('./exception')
http.createServer(function(req,res){
	if(req.url!=='/favicon.ico'){//防止出现二次访问
		var pathname = url.parse(req.url).pathname;//结果是带有‘/’的
		pathname = pathname.replace(/\//,'');//替换掉前面的'/'符号	
		//同步异常处理，try catch	
		try{
			router[pathname](req,res);//动态读写url里的路由，并做出相关的操作，采用的是字符串调用函数名
		}
		catch(err){
			console.log(err);//后台打印错误
			res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})//开始
			res.write(err.toString());//err要以字符串的形式传递，前端打印输出
			res.end('');
		}
		}
}).listen(8000);//监听到8000端口

console.log('server running at http://127.0.0.1:8000/');


