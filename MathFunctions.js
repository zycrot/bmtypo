// MathFunctions.js

function CreateVector (playerPosX, playerPosY, enemyPosX, enemyPosY) {
	var newX = playerPosX - enemyPosX;
	var newY = playerPosY - enemyPosY;
	var vector = new Vector();
	vector.startupVector(newX, newY);

	return vector;
}

function NormalizeVector ( vector ) {
	var norm = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
	var newX = vector.x/norm;
	var newY = vector.y/norm;
	var newVector = new Vector();
	newVector.startupVector(newX, newY);

	return newVector;
}

