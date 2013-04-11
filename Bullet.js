// Bullet.js

Bullet.prototype = new Sprite();

function Bullet() {
	this.speed = 2;

	this.startupBullet = function(image, x, y) {
		this.startupSprite(image, x, y);
	}
}

Bullet.prototype.update = function(step, enemyPosX, enemyPosY) {
	//this.x += this.speed * step * enemyPosX;
	//this.y += this.speed * step * enemyPosY;
	this.y -= this.speed * step;
}

Bullet.prototype.draw = function(context) {
	Sprite.prototype.draw.call(this, context);
}