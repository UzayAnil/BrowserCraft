var height;
var width;
var cubeSize;
var evnBoxSize;
var playArea;
var player;
var chunk1;

var objects=[];
objects[0]={name:"Stone",img:"stone.png",id:"1"};
objects[1]={name:"Cobblestone",img:"cobble.png", id:"2"};
objects[2]={name:"Dirt",img:"dirt.png", id:"3"};
objects[3]={name:"Grass",img:"grass.png", id:"4"};
objects[4]={name:"Plank",img:"plank.png",id:"5"};
objects[5]={name:"Brick",img:"brick.png",id:"6"};

function createEnvBoxes()
{
	evnBoxSize = (height-(cubeSize*5))/2;

	var evn1 = document.createElement("div");
	evn1.setAttribute("id","evn1");
	document.getElementById("envBox").appendChild(evn1);

	var evn2 = document.createElement("div");
	evn2.setAttribute("id","evn2");
	document.getElementById("envBox").appendChild(evn2);

	evn1.style.height=evnBoxSize+"px"
	evn2.style.height=evnBoxSize+"px"

}

function initPlayArea()
{
	playArea = document.getElementById("playBox");
	playArea.style.height= (cubeSize*5)+"px";
	playArea.style.top = evnBoxSize+"px";
}

function render(chunk)
{
	playArea.innerHTML="";

	var classes = [];

	for(var i = 0; i < chunk.length; i++)
	{
		for(var i2 = 0; i2 < chunk[i].length; i2++)
		{
			var block = document.createElement("div");
			playArea.appendChild(block);
			block.style.width=cubeSize+"px";
			block.style.height=cubeSize+"px";
			block.style.top=(i*cubeSize)+"px";	
			block.style.left=(cubeSize*i2)+"px";
			block.style.position="absolute";
			block.setAttribute("horz", i);
			block.setAttribute("vertz", i2);
			block.setAttribute("blockID", chunk[i].substr(i2,1));
			switch(chunk[i].substr(i2,1))
			{
			case "0":
				block.style.background="lightblue";
				break;
				
			case "1":
				block.style.backgroundImage="url(stone.png)";
				block.style.backgroundRepeat="repeat";
				block.style.backgroundSize="100% 100%";
				break;
				
			case "2":
				block.style.backgroundImage="url(cobble.png)";
				block.style.backgroundRepeat="repeat";
				block.style.backgroundSize="100% 100%";
				break;
				
			case "3":
				block.style.backgroundImage="url(dirt.png)";
				block.style.backgroundRepeat="repeat";
				block.style.backgroundSize="100% 100%";
				break;
				
			case "4":
				block.style.backgroundImage="url(grass.png)";
				block.style.backgroundRepeat="repeat";
				block.style.backgroundSize="100% 100%";
				break;
				
			case "5":
				block.style.backgroundImage="url(plank.png)";
				block.style.backgroundRepeat="repeat";
				block.style.backgroundSize="100% 100%";
				break;
				
			case "6":
				block.style.backgroundImage="url(brick.png)";
				block.style.backgroundRepeat="repeat";
				block.style.backgroundSize="100% 100%";
				break;
			}
			
		}
	}

}

function initPlayer()
{
	var playerDiv = document.createElement("div");
	document.getElementById("playBox").appendChild(playerDiv);
	playerDiv.setAttribute("id", "player");
	playerDiv.style.width = cubeSize+"px";
	playerDiv.style.height = (cubeSize*2)+"px";
	player = document.getElementById("player");
	setInterval(startPhysics, 10);
}

var oldFoot;

function ceilFoot(playerFoot)
{
	var cubeSizes = new Array();
	for(var i = 1;i<=5;i++)
	{
		if(playerFoot==cubeSize*i)
		{
			return playerFoot/cubeSize;
		}
		cubeSizes.push(cubeSize*i);
	}
	var nearest;
	for(var h = 0; h < cubeSizes.length; h++)
	{
		
		if(playerFoot<cubeSizes[h])
		{
			nearest=cubeSizes[h];
			break;
		}
	}
	return nearest/cubeSize;
}

function ceilHori(playerFoot)
{
	var cubeSizes = new Array();
	for(var i = 1;i<=16;i++)
	{
		if(playerFoot==cubeSize*i)
		{
			return playerFoot/cubeSize;
		}
		cubeSizes.push(cubeSize*i);
	}
	var nearest;
	for(var h = 0; h < cubeSizes.length; h++)
	{
		
		if(playerFoot<cubeSizes[h])
		{
			nearest=cubeSizes[h];
			break;
		}
	}
	return nearest/cubeSize;
}

function startPhysics()
{	
	var gravity = 3;
	var playerStyles = window.getComputedStyle(player);
	var playerTop = Number(playerStyles.top.substr(0,playerStyles.top.length-2));
	var playerLeft = Number(playerStyles.left.substr(0,playerStyles.left.length-2));
	
	var playerFoot = playerTop+(cubeSize*2);
	playerFoot = ceilFoot(playerFoot)-1;
	
	
	var playerHori = playerLeft+(cubeSize*1);
	playerHori=ceilHori(playerHori)-1;
	
	var playerOn = chunk1[playerFoot].substr(playerHori,1);
	var playerOn2 = chunk1[playerFoot].substr(playerHori-1,1);
	
	
	if(playerOn=="0" && playerOn2=="0")
	{
		player.style.top=(playerTop+gravity)+"px";
	}
	
	
	if(isRight && chunk1[playerFoot-1].substr(playerHori,1)==0 && chunk1[playerFoot-2].substr(playerHori,1)==0)
	{
		player.style.left=(playerLeft+gravity)+"px"
	}
	if(isLeft && chunk1[playerFoot-1].substr(playerHori-1,1)==0 && chunk1[playerFoot-2].substr(playerHori-1,1)==0)
	{
		player.style.left=(playerLeft-gravity)+"px"
	}
	
	
	
	

}

var isLeft=false;
var isRight=false;

function keyDowned(event)
{
	switch(event.keyCode){
	case 37:
		isLeft=true;
		break;

	case 39:
		isRight=true;
		break;

	default:
		break;
	}
	return false;
}

function keyUped(event)
{
	switch(event.keyCode){
	case 37:
		isLeft=false;
		break;

	case 39:
		isRight=false;
		break;
		
	case 32:
		player.style.top="0px";
		break;
		
	default:
		break;
	}
	return false;
}
function clicked(e)
{
	if(e.button==0)
	{
		e = e.target || e.srcElement;
		if(e.getAttribute("horz")==null)
		{
			return;
		}
		var horz = e.getAttribute("horz");
		var vertz = e.getAttribute("vertz");
		var curChunk = chunk1[horz];
		
		var tempChunk = curChunk.substring(0,vertz);
		tempChunk+= "0";
		tempChunk+= curChunk.substring(Number(vertz)+1,curChunk.length);
		chunk1[horz]=tempChunk;	
		
		e.setAttribute("blockID", "0");
		e.style.background="lightblue";
	}
	return false;
}

function rclicked(e)
{
	e = e.target || e.srcElement;
	
	if(e.getAttribute("horz")==null || e.getAttribute("blockID")!="0")
	{
		return false;
	}
	var horz = e.getAttribute("horz");
	var vertz = e.getAttribute("vertz");
	var curChunk = chunk1[horz];
	
	var tempChunk = curChunk.substring(0,vertz);
	tempChunk+= objects[curSel].id;
	tempChunk+= curChunk.substring(Number(vertz)+1,curChunk.length);
	
	chunk1[horz]=tempChunk;

	e.setAttribute("blockID", objects[curSel].id);
	e.style.backgroundImage="url("+objects[curSel].img+")";
	e.style.backgroundRepeat="repeat";
	e.style.backgroundSize="100% 100%";
	
	return false;
}
var curSel=0;
function scrolld(e)
{
	if(e.wheelDelta){
		var delta = e.wheelDelta / 60;
		switch(delta)
		{
		case 2:
			curSel+=1;
			if(curSel>=objects.length){curSel=0}
			document.title=objects[curSel].name;
			break;
			
		case -2:
			curSel-=1;
			if(curSel<=-1){curSel=objects.length-1}
			document.title=objects[curSel].name;
			break;
			
		}}else{
		var delta = e.detail;
		switch(delta)
		{
		case -3:
			curSel+=1;
			if(curSel>=objects.length){curSel=0}
			document.title=objects[curSel].name;
			break;
			
		case 3:
			curSel-=1;
			if(curSel<=-1){curSel=objects.length-1}
			document.title=objects[curSel].name;
			break;
			
		}
	}
}
window.onload=function()
{

	height = window.innerHeight;
	width = window.innerWidth;
	cubeSize = Math.ceil(width / 16);


	createEnvBoxes();
	initPlayArea();

	chunk1 = "0550000000000000 0006000000000000 0006000000000000 4444544444444444 3333333333333333";
	chunk1 = chunk1.split(" ");
	render(chunk1);

	initPlayer();
	document.onkeydown=keyDowned;
	document.onkeyup=keyUped;
	
	document.addEventListener('mouseup', clicked, false);
	
	document.oncontextmenu=rclicked;
	
	document.addEventListener('DOMMouseScroll', scrolld, false);
	document.onmousewheel = scrolld;

}