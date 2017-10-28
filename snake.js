/*
	JavaScript Snake Arcade Game
	By Hanbat Kil
	Oct.25 2017
*/


/**
* @class Snake
*/
class Snake {
	/**
	* This class manages the snake which will be pursuing food in the board
	* @class Snake
	* @constructor
	* @param {Size} defines the side length of a snake(square) object
	*/
	constructor(rectSize) {
		
		this.rectSize = rectSize; //size of a side of snake(square)
		this.x = rectSize; // initialize x, y coordinates to 
		this.y = rectSize; // 1 block away from the top-left
		this.length = 1;  //length of snake
		this.moved = true; // checker to ensure we only accept forward direction
		let that = this;

		// event handler to accept arrows as the direction for Snake Object
		// but to make sure that we don't want to let our snake move backwards (left -> right, up -> down), vice versa
		// used 'moved' as a measure to ensure we only allow it to move forward
	    window.addEventListener('keydown', function () {
	    	if(that.moved){
				switch(event.keyCode){
					case 37: 
						direction = (that.length == 1 || direction != 'right') ? 'left' : direction
						break
					case 38:
						direction = (that.length == 1 || direction != 'down') ? 'up' : direction
						break
					case 39:
						direction = (that.length == 1 || direction != 'left') ? 'right' : direction
						break
					case 40:
						direction = (that.length == 1 || direction != 'up') ? 'down' : direction
						break
				}

				that.moved = false;
			}
	    });

	    // event handler to let the canvas, and food to rearrange accordingly
	    // to the browser resizing by user
	    // happens when a resize is considered 'done'
	    window.addEventListener('resize', function() {
	    	clearTimeout(timer);
	    	timer = setTimeout(function() {
	    		init();
	    	})
	    })

	    this.initialize();
	}

	// this function draws Snake in the canvas
	initialize() {
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.rectSize, this.rectSize);
        ctx.strokeRect(this.x, this.y, this.rectSize, this.rectSize);

	}
}

/**
* This method re-initiate the board when the browser is resized
* @method resizeBoard
*/
function resizeBoard(rectSize) {
	let marginWidth = (window.innerWidth % rectSize) + rectSize * 2,
		marginHeight = (window.innerHeight % rectSize) + rectSize * 2,
		boardWidth = window.innerWidth - marginWidth,
		boardHeight = window.innerHeight - marginHeight;

	myCanvas.width = boardWidth;
	myCanvas.height = boardHeight;
	wrapper.innerHeight = window.innerHeight;
	wrapper.innerWidth = window.innerWidth;
	wrapper.style.marginLeft = marginWidth / 2;
	wrapper.style.marginTop = marginHeight / 2;
}

/**
* This method moves our Snake object
* @method move
*/
function move(){
	let back = ctx.getImageData(snake.x, snake.y, snake.rectSize, snake.rectSize);

	// when snake did not eat anything yet
  	if (snake.length === 1) {
  		ctx.fillStyle = "yellow";
  		ctx.clearRect(snake.x-1, snake.y-1, snake.rectSize+2, snake.rectSize+2);
	}
	else {
		let x = snake.x,
			y = snake.y,
			tmpCtx = myCanvas.getContext('2d');
		setTimeout(function () {
			tmpCtx.fillStyle = "yellow"
		  	tmpCtx.clearRect(x, y, snake.rectSize, snake.rectSize);
		}, speed * snake.length)
	}

	switch (direction) {
		case 'up' :
			snake.y -= snake.rectSize;
			break;
		case 'down' :
			snake.y += snake.rectSize;
			break;
		case 'left' :
			snake.x -= snake.rectSize;
			break;
		case 'right' :
			snake.x += snake.rectSize;
			break;	
		default :
			break;
	}

	detectGameOver();
	ctx.putImageData(back, snake.x, snake.y)
	detectFood();
	snake.moved = true;
}

/**
* This method keeps our game going
* @method gameLoop
*/
function gameLoop(){
	setInterval(move, speed);
}

/**
* This method checks if Snake has a collision with Food
* @method detectFood
*/
function detectFood(){
	if (snake.x == food.x  && snake.y == food.y) {
		snake.length += 5;
		food = new Food(snake.rectSize);
	}
}

/**
* This method checks if Snake has a collision with the wall or itself
* @method detectGameOver
*/
function detectGameOver() {
	let snakeCtx = ctx.getImageData(snake.x, snake.y, snake.rectSize, snake.rectSize),
		snakeHead = snakeCtx.data,
		hex = "#" + ("000000" + rgbToHex(snakeHead[0], snakeHead[1], snakeHead[2])).slice(-6);

    // hit the wall
	if (snake.x < 0 || snake.y <0 || snake.x >= myCanvas.width || snake.y >= myCanvas.height) {
		alertGameOver();
		clearCanvas();
		init();
	}

	//suicide case...
	if (hex == "#80bf80") {
		ctx.fillStyle = "black";
  		ctx.fillRect(snake.x, snake.y, snake.rectSize, snake.rectSize);
		alertGameOver();
		clearCanvas();
		init();
	}

}

/**
* This method alert user that the game is over
* @method alertGameOver
*/
function alertGameOver() {
	alert("Game is now OVER... \nPlease Click 'OK' to play again.");
}

/**
* This method clears everything on the canvas
* @method clearCanvas
*/
function clearCanvas() {
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
}

/**
* This method initiates the game with a Snake and a food
* @method init
*/
function init() {
	let size = 15
	direction = null;
	wrapper = document.getElementById('wrapper');
	resizeBoard(size);
	snake = new Snake(size);
	food = new Food(snake.rectSize);

}

let speed = 70,
	direction = null, 
	timer, 
	wrapper, 
	snake;

init();
gameLoop();