/*

	运用Express搭建Server服务器，利用request发起网络请求
	利用cheerio可以像jquery一样操作Request渠道的网络数据

	~ ~ ~简单的爬虫原理~ ~ ~

*/


var express = require('express');
var app = express();
var request = require('request')
var cheerio = require('cheerio')

app.get('/', function(req, res){
  request('http://www.imooc.com//',function(error,response,body){
  	if (!error && response.statusCode == 200) {
  		$ = cheerio.load(body)
  		res.json({
  			'SearchNum':$('.menuContent .item span').length
  		})
  	}
  })
});

app.listen(3000);