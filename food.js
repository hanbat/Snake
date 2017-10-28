/*
	JavaScript Snake Arcade Game
	By Hanbat Kil
	Oct.25 2017
*/

/**
* @class Food
*/
class Food {
	/**
	* This class defines the food which will be eaten by a snake
	* @class Snake
	* @constructor
	* @param {Size} defines the size of width/height of a food object
	*/
	constructor(size) {
		this.size = size;
		this.x = randomPosition(myCanvas.width, size); 
		this.y = randomPosition(myCanvas.height, size); 
		this.initialize();
	}

	initialize() {

		let some = ctx.getImageData(this.x, this.y, this.size, this.size),
			foodSpot = some.data,
			hex = "#" + ("000000" + rgbToHex(foodSpot[0], foodSpot[1], foodSpot[2])).slice(-6);

    	while (hex != "#000000") {
    		this.x = randomPosition(myCanvas.width, this.size)
			this.y = randomPosition(myCanvas.height, this.size)
			some = ctx.getImageData(this.x, this.y, this.size, this.size);
			foodSpot = some.data;
    		hex = "#" + ("000000" + rgbToHex(foodSpot[0], foodSpot[1], foodSpot[2])).slice(-6);

    	}

        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'darkblue';
        ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

/**
* This method returns random value of a coordinate(either x or y)
* @method randomPosition
* @param {dimension} input param for either width/height of canvas  
* @param {size} input param for the size of a side of snake/food
*/
function randomPosition(dimension, size){
	return (Math.floor(Math.random()*1000) * size) % dimension; 
}

/**
* This method initiate a food with same size of a snake
* @method initFood
*/
function initFood(){
	food = new Food(snake.size);
}

/**
* This method returns hex value of RGB input
* @method rgbToHex
*/
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

let myCanvas = document.getElementById('board'),
	ctx = myCanvas.getContext('2d'),
	food;

	