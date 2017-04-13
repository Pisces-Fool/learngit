var mongoose = require('mongoose')
var News = mongoose.model('News')

module.exports = {
	create: function(req,res,next){
		var news = new News(req.body);//req.body是提交的数据所存在的位置
		news.save(function (err){
			if(err) return next(err);
			return res.json(news)
		})
	},
	list:function(req,res,next){
		var pagesize = parseInt(req.query.pagesize,10) || 10;//每页项数
		var pagestart = parseInt(req.query.pagestart,10) || 1;// 每页开始为第几项

		//find找到所有项，skip每页的第一项为第几个，limit每页多少项
		News
		.find()
		.skip((pagestart - 1) * pagesize )
		.limit(pagesize)
		.exec(function(err,docs){
			if(err) return next(err)
			return res.json(docs)
		})
	},
	getById:function(req,res,next,id){
		if(!id){return next(new Error('News not Found'))}
		News
		.findOne({_id:id})
		.exec(function(err,doc){
			if(err) return next(err)
			if(doc) return next(new Error('News not Found'))
			req.news = doc
			return next()
		})
	},
	get:function(req,res,next){
		return res.json(req.news)
	}
}
