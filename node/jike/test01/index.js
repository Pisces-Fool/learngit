var express = require('express')

var app = express();


// 路由定义的第一种方法，path，简便
app.get('/',function(req,res){
	res.end('hello')
})

// 路由定义的第二种方法，Router，定义同一路由下的子路由
Router.get('/add',function(req,res){
	res.end('Router add')
})
Router.get('/list',function(req,res){
	res.end('Router list')
})
//add和list在first目录，后一级
app.use('/first',Router)


//路由定义的第三种方法，route

app.route('/second')
	.get(function(res,req){
		res.end(' route get')
	})
	.post(function(res,req){
		res.end(' route post')
	})


app.listen(3300,function afterListen(){
	console.log('express 3300')
})