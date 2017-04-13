var express = require('express')
var port = process.env.PORT || 2222
var app = express()//启动web服务器

app.set('views','./views')
app.set('view engine','jade')
app.listen(port)

console.log('success! The port is '+port);

//编写路由get('/')表示在路由里的标识路径

//index.jade
app.get('/',function(req,res){
	res.render('index',{
		title: 'imooc 首页'
	})
})

//detail.jade
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title: 'imooc 详情页'
	})
})

//admin.jade
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title: 'imooc 后台录入页'
	})
})

//list.jade
app.get('/admin/list',function(req,res){
	res.render('list',{
		title: 'imooc 后台列表页'
	})
})
