// PlayerBase.js

PlayerBase.prototype = new Sprite;

function PlayerBase() {
	this.startupPlayerBase = function(image, x, y) {
		this.startupSprite(image, x, y);
	}
}
