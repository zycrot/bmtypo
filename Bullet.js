// Bullet.js

Bullet.prototype = new Sprite();

function Bullet() {
	this.speed = 4;

	this.startupBullet = function(image, x, y) {
		this.startupSprite(image, x, y);
	}
}

Bullet.prototype.update = function(step, playerPosX, playerPosY, enemyPosX, enemyPosY) {
	var vector = CreateVector(playerPosX, playerPosY, enemyPosX, enemyPosY);
	var normVector = NormalizeVector(vector);
	this.x += normVector.x * this.speed;
	this.y -= normVector.y * this.speed;
	//this.y -= this.speed * step;
}

Bullet.prototype.draw = function(context) {
	Sprite.prototype.draw.call(this, context);
}
