/*  读取文件   有同步、异步两种方式 */


var fs = require('fs');
module.exports = {
	readfileSync:function(path){
		var data = fs.readFileSync(path,'utf-8');
		//console.log(data);
		console.log('sync was run');
	},
	readfile:function(path,recall){
		//异步异常处理
		fs.readFile(path,function(err,data){
			if (err) {
				console.log(err);
				recall('文件不存在！')
			} else {
				console.log(data.toString());
				recall(data);
			}
		})
		console.log('asnc was run');
	},
	writefile:function(path,data,recall){
		fs.writeFile(path,data,function(err){
			if (err) {
				throw err;
			} 
			console.log('it is saved !');
			recall('异步写文件成功！');
		})
		console.log('asnc was run');
	},
	writefileSync:function(path,data){
		fs.writefileSync(path,data);
		console.log('同步写文件完成！');
	},
	readImg:function(path,res){
		fs.readFile(path,'binary',function(err,file){
			if (err) {
				throw err;
			} else {
				res.write(file,'binary');
				res.end();
			}
		});
	}
}