/* 用户模块----学生和教师
公用的属性，姓名，编号，年龄
公用的方法，进入图书馆*/


function User(id ,name ,age){
	this.id =id;
	this.name = name;
	this.age = age;
	this.lib = function(){
		console.log(this.name+'进入图书馆')
	}
}


module.exports = User;//声明，导出