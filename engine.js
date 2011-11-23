var BCEngine = new Object();
BCEngine.height=0;
BCEngine.width=0;
BCEngine.cubeSize=0;
BCEngine.evnBoxSize=0;
BCEngine.playArea=null;
BCEngine.player=null;
BCEngine.currentSelection=0;

BCEngine.map=new Object();
BCEngine.map.chunk1=null;

BCEngine.objects=[];
BCEngine.objects[0]={name:"Stone",img:"stone.png",id:"1"};
BCEngine.objects[1]={name:"Cobblestone",img:"cobble.png", id:"2"};
BCEngine.objects[2]={name:"Dirt",img:"dirt.png", id:"3"};
BCEngine.objects[3]={name:"Grass",img:"grass.png", id:"4"};
BCEngine.objects[4]={name:"Plank",img:"plank.png",id:"5"};
BCEngine.objects[5]={name:"Brick",img:"brick.png",id:"6"};

BCEngine.keyPresses = new Object();
BCEngine.keyPresses.isLeft=false;
BCEngine.keyPresses.isRight=false;

BCEngine.utils = new Object();
BCEngine.eventHandlers = new Object();

BCEngine.createEnvBoxes=function()
{
	BCEngine.evnBoxSize = ( BCEngine.height -( BCEngine.cubeSize * 5 ) ) /2 ;

	var evn1 = document.createElement("div");
	evn1.setAttribute("id","evn1");
	document.getElementById("envBox").appendChild(evn1);

	var evn2 = document.createElement("div");
	evn2.setAttribute("id","evn2");
	document.getElementById("envBox").appendChild(evn2);

	evn1.style.height = BCEngine.evnBoxSize + "px"
	evn2.style.height = BCEngine.evnBoxSize + "px"

}

BCEngine.initPlayArea = function()
{
	BCEngine.playArea = document.getElementById("playBox");
	BCEngine.playArea.style.height = ( BCEngine.cubeSize * 5 ) + "px";
	BCEngine.playArea.style.top = BCEngine.evnBoxSize+"px";
}

BCEngine.renderChunk = function(chunk)
{
	BCEngine.playArea.innerHTML = "";

	for(var i = 0; i < chunk.length; i++)
	{
		for(var i2 = 0; i2 < chunk[i].length; i2++)
		{
			var block = document.createElement("div");
			BCEngine.playArea.appendChild(block);
			block.style.width = BCEngine.cubeSize + "px";
			block.style.height = BCEngine.cubeSize + "px";
			block.style.top = ( i * BCEngine.cubeSize ) + "px";	
			block.style.left = ( BCEngine.cubeSize * i2 ) + "px";
			block.style.position = "absolute";
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

BCEngine.initPlayer = function()
{
	var playerDiv = document.createElement("div");
	document.getElementById("playBox").appendChild(playerDiv);
	playerDiv.setAttribute("id", "player");
	playerDiv.style.width = BCEngine.cubeSize + "px";
	playerDiv.style.height = ( BCEngine.cubeSize * 2 ) + "px";
	
	BCEngine.player = document.getElementById("player");
	
	setInterval(BCEngine.startPhysics, 10);
}

BCEngine.utils.ceilFoot = function(playerFoot)
{
	var cubeSizes = new Array();
	for(var i = 1;i<=5;i++)
	{
		if( playerFoot == BCEngine.cubeSize*i)
		{
			return playerFoot/BCEngine.cubeSize;
		}
		cubeSizes.push(BCEngine.cubeSize*i);
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
	return nearest/BCEngine.cubeSize;
}

BCEngine.utils.ceilHori = function(playerFoot)
{
	var cubeSizes = new Array();
	for(var i = 1;i<=16;i++)
	{
		if(playerFoot == BCEngine.cubeSize*i)
		{
			return playerFoot/BCEngine.cubeSize;
		}
		cubeSizes.push(BCEngine.cubeSize*i);
	}
	var nearest;
	for(var h = 0; h < cubeSizes.length; h++)
	{
		
		if( playerFoot< cubeSizes[h])
		{
			nearest=cubeSizes[h];
			break;
		}
	}
	return nearest/BCEngine.cubeSize;
}

BCEngine.startPhysics = function()
{	
	var gravity = 3;
	var playerStyles = window.getComputedStyle(BCEngine.player);
	var playerTop = Number(playerStyles.top.substr(0,playerStyles.top.length-2));
	var playerLeft = Number(playerStyles.left.substr(0,playerStyles.left.length-2));
	
	var playerFoot = playerTop + ( BCEngine.cubeSize * 2);
	playerFoot = BCEngine.utils.ceilFoot(playerFoot)-1;
	
	
	var playerHori = playerLeft + ( BCEngine.cubeSize * 1 );
	playerHori=BCEngine.utils.ceilHori(playerHori)-1;
	
	var playerOn = BCEngine.map.chunk1[playerFoot].substr(playerHori,1);
	var playerOn2 = BCEngine.map.chunk1[playerFoot].substr(playerHori-1,1);
	
	
	if(playerOn=="0" && playerOn2=="0")
	{
		BCEngine.player.style.top=(playerTop+gravity)+"px";
	}
	
	
	if(BCEngine.keyPresses.isRight && BCEngine.map.chunk1[playerFoot-1].substr(playerHori,1)==0 && BCEngine.map.chunk1[playerFoot-2].substr(playerHori,1)==0)
	{
		BCEngine.player.style.left=(playerLeft+gravity)+"px"
	}
	if(BCEngine.keyPresses.isLeft && BCEngine.map.chunk1[playerFoot-1].substr(playerHori-1,1)==0 && BCEngine.map.chunk1[playerFoot-2].substr(playerHori-1,1)==0)
	{
		BCEngine.player.style.left=(playerLeft-gravity)+"px"
	}
	
	
	
	

}

BCEngine.eventHandlers.keyDownEvent = function(event)
{
	switch(event.keyCode){
	case 37:
		BCEngine.keyPresses.isLeft=true;
		break;

	case 39:
		BCEngine.keyPresses.isRight=true;
		break;

	default:
		break;
	}
	return false;
}

BCEngine.eventHandlers.keyUpEvent = function(event)
{
	switch(event.keyCode){
	case 37:
		BCEngine.keyPresses.isLeft=false;
		break;

	case 39:
		BCEngine.keyPresses.isRight=false;
		break;
		
	case 32:
		BCEngine.player.style.top="0px";
		break;
		
	default:
		break;
	}
	return false;
}
BCEngine.eventHandlers.mouseUpEvent = function(e)
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
		var curChunk = BCEngine.map.chunk1[horz];
		
		var tempChunk = curChunk.substring(0,vertz);
		tempChunk+= "0";
		tempChunk+= curChunk.substring(Number(vertz)+1,curChunk.length);
		BCEngine.map.chunk1[horz]=tempChunk;	
		
		e.setAttribute("blockID", "0");
		e.style.background="lightblue";
	}
	return false;
}

BCEngine.eventHandlers.rightClickEvent = function(e)
{
	e = e.target || e.srcElement;
	
	if(e.getAttribute("horz")==null || e.getAttribute("blockID")!="0")
	{
		return false;
	}
	var horz = e.getAttribute("horz");
	var vertz = e.getAttribute("vertz");
	var curChunk = BCEngine.map.chunk1[horz];
	
	var tempChunk = curChunk.substring(0,vertz);
	tempChunk+= BCEngine.objects[BCEngine.currentSelection].id;
	tempChunk+= curChunk.substring(Number(vertz)+1,curChunk.length);
	
	BCEngine.map.chunk1[horz]=tempChunk;

	e.setAttribute("blockID", BCEngine.objects[BCEngine.currentSelection].id);
	e.style.backgroundImage="url("+BCEngine.objects[BCEngine.currentSelection].img+")";
	e.style.backgroundRepeat="repeat";
	e.style.backgroundSize="100% 100%";
	
	return false;
}

BCEngine.eventHandlers.scrollEvent = function(e)
{
	if(e.wheelDelta){
		var delta = e.wheelDelta / 60;
		switch(delta)
		{
		case 2:
			BCEngine.currentSelection+=1;
			if(BCEngine.currentSelection>=BCEngine.objects.length){BCEngine.currentSelection=0}
			document.title=BCEngine.objects[BCEngine.currentSelection].name;
			break;
			
		case -2:
			BCEngine.currentSelection-=1;
			if(BCEngine.currentSelection<=-1){BCEngine.currentSelection=BCEngine.objects.length-1}
			document.title=BCEngine.objects[BCEngine.currentSelection].name;
			break;
			
		}}else{
		var delta = e.detail;
		switch(delta)
		{
		case -3:
			BCEngine.currentSelection+=1;
			if(BCEngine.currentSelection>=BCEngine.objects.length){BCEngine.currentSelection=0}
			document.title=BCEngine.objects[BCEngine.currentSelection].name;
			break;
			
		case 3:
			BCEngine.currentSelection-=1;
			if(BCEngine.currentSelection<=-1){BCEngine.currentSelection=BCEngine.objects.length-1}
			document.title=BCEngine.objects[BCEngine.currentSelection].name;
			break;
			
		}
	}
}

window.onload=function()
{

	BCEngine.height = window.innerHeight;
	BCEngine.width = window.innerWidth;
	BCEngine.cubeSize = Math.ceil(BCEngine.width / 16);
	
	BCEngine.map.chunk1 = "0550000000000000 0006000000000000 0006000000000000 4444544444444444 3333333333333333";
	BCEngine.map.chunk1 = BCEngine.map.chunk1.split(" ");
	
	BCEngine.createEnvBoxes();
	BCEngine.initPlayArea();
	BCEngine.renderChunk(BCEngine.map.chunk1);
	BCEngine.initPlayer();
	
	document.onkeydown=BCEngine.eventHandlers.keyDownEvent;
	document.onkeyup=BCEngine.eventHandlers.keyUpEvent;
	
	document.addEventListener('mouseup', BCEngine.eventHandlers.mouseUpEvent, false);
	
	document.oncontextmenu=BCEngine.eventHandlers.rightClickEvent;
	
	document.addEventListener('DOMMouseScroll', BCEngine.eventHandlers.scrollEvent, false);
	document.onmousewheel = BCEngine.eventHandlers.scrollEvent;

}