//所有函数在一个匿名函数里，就不会影响性能
(function(){
	function award (){}
	//prototype ：追加方法或原型，init是自定义的，但名字尽量语义化
	award.prototype.init = function(opts){
		
	}
})();//代表自执行函数