/*写入文件*/
var http = require('http');
var url = require('url');
var router = require('./router');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})//开始
	if(req.url!=='/favicon.ico'){//防止出现二次访问
		//optfile.readfileSync('./views/login.html');//同步

		/* 闭包函数，解决异步访问出错的问题 */
		var pathname = url.parse(req.url).pathname;//结果是带有‘/’的
		pathname = pathname.replace(/\//,'');//替换掉前面的'/'符号
		router[pathname](req,res);//动态读写url里的路由，并做出相关的操作，采用的是字符串调用函数名
		console.log('主文件执行完毕！');
	}
}).listen(8000);//监听到8000端口

console.log('server running at http://127.0.0.1:8000/');
