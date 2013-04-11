// EnemyShip.js

EnemyShip.prototype = new Sprite();

function EnemyShip() {
	this.hits = 0;
	this.letters = [];
	this.text
	this.speed = 2;
	this.boundary

	this.startupEnemyShip = function(image, x, y, boundary, textList) {
		
		var index = Math.min(Math.random()*19, 18);
		
		this.text = words[Math.floor(index)];
		textList.push(this.text);
		this.boundary = boundary;
		
		this.startupSprite(image, x, y);
	}

	this.texter = function(str, x, y, context) {
		var noOfHits = this.hits;

		for(var i = 0; i <= str.length; ++i) {
			var ch = str.charAt(i);

			if(noOfHits > 0) {
				context.fillStyle = 'red'; --noOfHits;
			} else {
				context.fillStyle = 'white';
			}

			context.fillText(ch, x, y);
			x += context.measureText(ch).width;
		}
	}
}

EnemyShip.prototype.update = function(step) {
	this.x += this.speed * step;
}

EnemyShip.prototype.draw = function(context) {
	Sprite.prototype.draw.call(this, context);

	// draw text
	context.textBaseline = 'top';
	context.font = 'normal 40px Arial';
	this.texter(this.text, this.x, this.y + this.image.height + 5, context);

}
