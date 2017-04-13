var chess = document.getElementById("chess");
var context = chess.getContext("2d");

var isBlack = true;
var over = false;

//棋盘落子数组
var chessArr = [];

for(var i=0;i<15;i++){
	chessArr[i]=[];
	for(var j=0;j<15;j++){
		chessArr[i][j]=0;
	}
}

//赢法数组,三维
var wins =[];

//赢法统计数组，一维
var myWin = [];
var comWin = [];

for(var i=0;i<15;i++){
	wins[i]=[];
	for(var j=0;j<15;j++){
		wins[i][j]=[];
	}
}

var count = 0;//赢法种类的索引
//竖五子
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){//确定边界
		for(var k=0;k<5;k++){//连成五子
			wins[i][j+k][count]=true;
		}count++;//赢法种类
	}
}
// console.log(count);
//横五子
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){//确定边界
		for(var k=0;k<5;k++){//连成五子
			wins[j+k][i][count]=true;
		}count++;//赢法种类
	}
}
// console.log(count);
//斜五子
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){//确定边界
		for(var k=0;k<5;k++){//连成五子
			wins[i+k][j+k][count]=true;
		}count++;//赢法种类
	}
}
// console.log(count);
//反斜五子
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){//确定边界
		for(var k=0;k<5;k++){//连成五子
			wins[i+k][j-k][count]=true;
		}count++;//赢法种类
	}
}

// console.log(count);

for(var i=0;i<count;i++){
	myWin[i]=0;
	comWin[i]=0;
}

/* 绘制棋盘 */
context.strokeStyle = "#eeeeee";

var logo = new Image();
logo.src = "images/lol.jpg";

/* 加载图片水印的回调函数*/
logo.onload = function(){
	context.drawImage(logo,0,0,450,450);
	drawChessPaper();
	// oneChess(1,1,true);
}

var drawChessPaper=function(){
	for (var i = 0; i < 15; i++) {
	context.moveTo(15+i*30,15);
	context.lineTo(15+i*30,435);
	context.stroke();
	context.moveTo(15,15+i*30);
	context.lineTo(435,15+i*30);
	context.stroke();
	}
}

var oneChess = function(i,j,isBlack){
	context.beginPath();
	context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
	context.closePath();
	//渐变 参数分别为两个圆的圆心和半径
	var gradient = context.createRadialGradient(17+30*i,13+30*j,13,17+30*i+2,13+30*j,0);
	if (isBlack) {
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636766");
	}
	else {
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	//起止两个圆的颜色，0，1表示百分比
	
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	// alert("aa");
	if (over) {
		return;
	}
	if (!isBlack) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
    // oneChess(i,j,true);
	if (chessArr[i][j]==0) {//网盘的二维数组中，位置为0的表示还没有落子。
		oneChess(i,j,isBlack);
		chessArr[i][j]=1;//网盘的二维数组中，黑子的位置为1.
		
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				myWin[k]++;//我方在第k种赢法的情况下，可能性加一
				comWin[k]=9;//敌方就在第k种赢法的情况，就不可能实现，就赋值为5以上的数
				if (myWin[k]==5) {
					alert('你赢了,请刷新页面重新再来一局！');
					over = true ;
				} 

		}
	}
	if(!over){
		isBlack = !isBlack;
		comAI();
	}
	}
}

var comAI = function(){
	var myScore = [];
	var comScore = [];
	var max = 0;
	var u,v;
	for(var i=0;i<15;i++){
		myScore[i] = [];
		comScore[i] = [];
		for(var j=0;j<15;j++){
			myScore[i][j] = 0;
			comScore[i][j] = 0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessArr[i][j][k]){
				if (myWin[k]==1) {
					myScore[i][j]+=200;
				}else if (myWin[k]==2) {
					myScore[i][j]+=400;
				}else if (myWin[k]==3) {
					myScore[i][j]+=2000;
				}else if (myWin[k]==4) {
					myScore[i][j]+=10000;
				}
				if (comWin[k]==1) {
					myScore[i][j]+=250;
				}else if (comWin[k]==2) {
					comScore[i][j]+=500;
				}else if (comWin[k]==3) {
					comScore[i][j]+=2800;
				}else if (comWin[k]==4) {
					comScore[i][j]+=20000;
				}
			}
		}
		if (myScore[i][j]>max) {
			max = myScore[i][j];
			u=i;
			v=j;
		}else if(myScore[i][j]==max){
			if (comScore[i][j]>comScore[u][v]) {
				u=i;
				v=j;
			}
		}
		if (comScore[i][j]>max) {
			max = comScore[i][j];
			u=i;
			v=j;
		}else if(comScore[i][j]==max){
			if (myScore[i][j]>myScore[u][v]) {
				u=i;
				v=j;
			}
		}
	}
	oneChess(u,v,false);
	chessArr[u][v] = 2;
	for(var k=0;k<count;k++){
	if(wins[u][v][k]){
		comWin[k]++;//我方在第k种赢法的情况下，可能性加一
		myWin[k]=9;//敌方就在第k种赢法的情况，就不可能实现，就赋值为5以上的数
		if (comWin[k]==5) {
			alert('你输了,请刷新页面重新再来一局！');
			over = true ;
		} 

	}
	}
	if(!over){
		isBlack = !isBlack;
	}
}
