var canvas=document.getElementById('snakeGame');        //linking canvas
var ctx=canvas.getContext('2d');         //it provides methods to draw  on canvas
var snakeCordinates=[{xaxis:200,yaxis:200},{xaxis:190,yaxis:200},{xaxis:180,yaxis:200},{xaxis:170,yaxis:200},{xaxis:160,yaxis:200},]; //cordinates for snake

var dx=0,dy=0,upwardMovement,rightMovement,downwardMovement,leftMovement,foodxaxis,foodyaxis,snakeTail;//variable declaration

// formation of snake

function snake() {
 snakeTail=snakeCordinates.length-1; //snake tail
	      for (var i =0;i<snakeTail;i++) {
	           ctx.fillStyle="blue";
	           ctx.fillRect(snakeCordinates[i].xaxis,snakeCordinates[i].yaxis,10,10);  //printing sanke cordinates
	           ctx.strokeRect(snakeCordinates[i].xaxis,snakeCordinates[i].yaxis,10,10);  //printing snake boundries
 	    	   ctx.clearRect(snakeCordinates[snakeTail].xaxis-1,snakeCordinates[snakeTail].yaxis-1,12,12);  //clearing snake tail
          }
}
snake();  //forming first snake

// movement of snake by arrow keys

window.addEventListener("keyup",(evt)=>{ 
switch(evt.keyCode){
	case 38: dx=0;                    
	         dy=-10;
	         stop();
	         upwardMovement=setInterval(movement,100);
 	break;
	case 40: dx=0;
	         dy=10;
	         stop();
	         downwardMovement=setInterval(movement,100);
	break;
	case 37: dx=-10;
	         dy=0;
	         stop();
	         leftMovement=setInterval(movement,100);
	break;
	case 39: dx=10;
	         dy=0;
	         stop();
	         rightMovement=setInterval(movement,100);
	break;
        }
});

// SnakeMovement

function movement(){ 
	//Updating snake cordinates
	var snakeHead={
		xaxis:snakeCordinates[0].xaxis+dx,
		yaxis:snakeCordinates[0].yaxis+dy
	}
	snake();
	snakeCordinates.unshift(snakeHead);
	snakeCordinates.pop();
	checkFoodCordinates();
	gameOver(); 	
}

// Avoid Multiple movement

function stop() { 
	clearInterval(upwardMovement);
	clearInterval(rightMovement);
	clearInterval(leftMovement);	
	clearInterval(downwardMovement);
	upwardMovement=null;
	downwardMovement=null;
	leftMovement=null;
	rightMovement=null;
}

// Food for snake

function food(){
	 foodxaxis=Math.floor(Math.random()*10)*40;
	 foodyaxis=Math.floor(Math.random()*10)*40;
     ctx.fillStyle="black";
	 ctx.fillRect(foodxaxis,foodyaxis,10,10);
	 ctx.strokeRect(foodxaxis,foodyaxis,10,10);
	
 //to avoid food on snake body
		 for (var i=1;i<snakeTail; i++) {
          if (foodxaxis==snakeCordinates[i].xaxis && foodyaxis==snakeCordinates[i].yaxis) { 
                   food();
                   break; 
             }	 	
       }

}
food();

//Adding tail whenever snake eats it's food 

function checkFoodCordinates(){
    if (snakeCordinates[0].xaxis==foodxaxis && snakeCordinates[0].yaxis==foodyaxis){
          var addingTail={
          	xaxis:snakeCordinates[0].xaxis+dx,
          	yaxis:snakeCordinates[0].yaxis+dy
                }
                 snakeCordinates.unshift(addingTail);
                 food();
        }
}

//Game over by colliding itself

function gameOver(){
	for (var i =1;i<snakeTail; i++) {
   		if (snakeCordinates[0].xaxis==snakeCordinates[i].xaxis && snakeCordinates[0].yaxis==snakeCordinates[i].yaxis){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.font="30px aerial";
            ctx.fillText("GAME OVER",0,200);
            stop();
               break;
		}
    }
}


