//支持多个函数
module.exports = {
	fun2:function(res){
		console.log('i am fun2');
		res.write('hello fun2');
	},//注意这个{}里的格式，每单个函数要用：，后面跟着匿名函数
	fun3:function(res){
		console.log('i am fun3');
		res.write('hello fun3')
	}
}
