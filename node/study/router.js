var optfile = require('./optfile');
var url = require('url')
var querystring = require('querystring');//post接收的时候采用
function getRecall(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})//开始
	function recall(data){
		res.write(data);
		res.end('');
	}
	return recall;
}

module.exports = {
	login:function(req,res){
		//get 和 post,post是密文的，而且传的数据很多，异步的。


		/*------get方式接参--------
		var rdata = url.parse(req.url,true).query;
		console.log(rdata);
		if (rdata['email'] !=undefined ) {
			console.log('邮箱是'+rdata['email'])
			console.log('密码是'+rdata['password'])
		}
		*/
		//------post方式接参--------
		var post = '';
		req.on('data',function(param){//on相当于回调，没接受到一个data，就把他们拼接起来，
			post += param;
		});
		req.on('end',function(){//当接收到end提示时，表示前面的data已经接收完成。
			post = querystring.parse(post);
			// console.log('邮箱是'+post['email']);
			// console.log('密码是'+post['password']);
			//因为post是异步的，将这两步放在此防止收到的和显示的参数，发生分离
			//recall = getRecall(req,res);
			var arr =['email','password']; 
			function recall(data){
				dataStr = data.toString();
				for(var i=0;i<arr.length;i++){
					re = new RegExp('{'+arr[i]+'}','g');//正则表示选择出动态的data，g表示全局
					dataStr = dataStr.replace(re,post[arr[i]]);
				}
				res.write(dataStr);
				res.end('');
			}
			optfile.readfile('./views/login.html',recall);
		})

		
	},
	register:function(req,res){
		recall = getRecall(req,res);
		optfile.readfile('./views/register.html',recall);
	},
	writefile:function(req,res){
		recall = getRecall(req,res);
		optfile.writefile('./views/1.html','my file was writen',recall);
	},
	showimg:function(req,res){
		res.writeHead(200,{'Content-Type':'image/jpeg'})
		optfile.readImg('./imgs/one.jpg',res);
	}
}