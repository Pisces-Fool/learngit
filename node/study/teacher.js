/*
teacher类继承了user的方法属性，并添加了自己的方法
*/


var User = require('./User')
function Teacher(id ,name, age){
	User.apply(this,[id,name,age]);//初始化，Teacher继承了User
	this.teach = function(res){
		res.write(this.name+'讲课')
	}
}
module.exports = Teacher;