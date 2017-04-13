/*读取图片*/
var http = require('http');
var url = require('url');
var router = require('./router');
var optfile = require('./optfile');
http.createServer(function(req,res){
	//res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})//开始
	res.writeHead(200,{'Content-Type':'image/jpeg'});
	if(req.url!=='/favicon.ico'){//防止出现二次访问
		//optfile.readfileSync('./views/login.html');//同步
		optfile.readImg('./imgs/one.jpg',res);
		
		console.log('主文件执行完毕！');
	}
}).listen(8000);//监听到8000端口

console.log('server running at http://127.0.0.1:8000/');
