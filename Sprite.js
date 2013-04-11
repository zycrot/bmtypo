// Sprite.js

function Sprite() {
	this.image
	this.x
	this.y

	this.startupSprite = function(image, x, y) {
		this.image = image;
		this.x = x;
		this.y = y;

		return this;
	}
}

Sprite.prototype.draw = function(context) {
	context.drawImage(this.image, this.x, this.y);
}
