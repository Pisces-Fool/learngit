requirejs.config({
	paths:{
		jquery:'jquery-3.0.0.min'
	}
});
requirejs(['jquery'],function($){
	$('body').css('background-color','red');
})