// Main.js

window.onload = windowLoadEvent;

function windowLoadEvent() {
	canvasApp();
}

/**
 Checks if browser supports canvas
 */
function canvasSupport() {
	return Modernizr.canvas;
}

function canvasApp() {
	if(!canvasSupport()) {
		return;
	} else {
		var theCanvas = document.getElementById('canvas');
		var context = theCanvas.getContext('2d');
	}

	//*** GLOBAL PROPERTIES
	var GP = {
		FPS : 30,
		C_WIDTH : theCanvas.width,
		C_HEIGHT : theCanvas.height,
		loadCount : 0,
		itemsToLoad : 5,
		bg1Img : new Image(),
		bg2Img : new Image(),
		bg3Img : new Image(),
		playerBaseImg : new Image(),
		enemyShipImg : new Image(),
		bulletImg : new Image()
	}

	// GameStateManager object
	var gameStateManager = new GameStateManager();

	//*** VARIABLES
	// game logic variables
	var keyPressed = false;
	var keyPressList = [];
	var pressed = [];
	var textList = [];
	var targetText = ""
	var targetEnemy;
	var progressIndex = 1;
	var inputtedText = "";

	// sprite variables
	var bg1 = new Sprite();
	var bg2 = new Sprite();
	var bg3 = new Sprite();
	var playerBase = new PlayerBase();
	var bulletList = new Array();
	var enemyList = new Array();
	var enemyShip = new EnemyShip();
	var bullet = new Bullet();

	//*** GAME MANAGING FUNCTIONS
	/**
	 Calls the current game state function
	 */
	function runGame() {
		currentGameStateFunction();
	}

	/**
	 Assigns newState param to currentGameStateFunction
	 @param newState String of current state function
	 */
	function switchGameState(newState) {
		gameStateManager.switchGameState(newState);
		screenStarted = false;

		switch (gameStateManager.currentGameState) {
			case gameStateManager.GAME_STATE_INIT:
				currentGameStateFunction = gameStateInit;
				break;
			case gameStateManager.GAME_STATE_LOADING:
				currentGameStateFunction = gameStateLoading;
				break;
			case gameStateManager.GAME_STATE_TITLE:
				currentGameStateFunction = gameStateTitle;
				break;
			case gameStateManager.GAME_STATE_NEW_LEVEL:
				currentGameStateFunction = gameStateNewLevel;
				break;
			case gameStateManager.GAME_STATE_MAIN_GAME:
				currentGameStateFunction = gameStateMainGame;
				break;
		}
	}

	//*** GAME STATE FUNCTION
	/**
	 Loads all the game resources
	 */
	function gameStateInit() {
		ConsoleLog.log("in init");

		GP.playerBaseImg = new Image();
		GP.playerBaseImg.src = "images/playerBase.png";
		GP.playerBaseImg.onload = itemLoaded;

		GP.enemyShipImg = new Image();
		GP.enemyShipImg.src = "images/enemyShip.png";
		GP.enemyShipImg.onload = itemLoaded;

		GP.bg1img = new Image();
		GP.bg1img.src = "images/space.png";
		GP.bg1img.onload = itemLoaded;

		GP.bg2Img = new Image();
		GP.bg2Img.src = "images/stars.png";
		GP.bg2Img.onload = itemLoaded;

		GP.bg3Img = new Image();
		GP.bg3Img.src = "images/stars2.png";
		GP.bg3Img.onload = itemLoaded;

		GP.bulletImg = new Image();
		GP.bulletImg.src = "images/bullet.png";
		GP.bulletImg.onload = itemLoaded;

		switchGameState(GP.GAME_STATE_LOADING);
	}

	/**
	 Loading screen
	 */
	function gameStateLoading() {
		ConsoleLog.log("in loading screen");
		context.fillText("loading...", theCanvas.width / 2, theCanvas.height / 2);
	}

	/**
	 Title screen
	 */
	function gameStateTitle() {
		ConsoleLog.log("in title");
	}

	/**
	 Initialize all the sprites and sets up the level
	 */
	function gameStateNewLevel() {
		ConsoleLog.log("in new level");
		context.clearRect(0, 0, GP.C_WIDTH, GP.C_HEIGHT);

		playerBase.startupPlayerBase(GP.playerBaseImg, GP.C_WIDTH / 2 - GP.playerBaseImg.width / 2, GP.C_HEIGHT - GP.playerBaseImg.height - 10);
		enemyShip.startupEnemyShip(GP.enemyShipImg, -GP.enemyShipImg.width, 0, GP.C_WIDTH, textList);
		enemyList.push(enemyShip);
		bg1.startupSprite(GP.bg1img, 0, 0);
		bg2.startupSprite(GP.bg2Img, 0, 0);
		bg3.startupSprite(GP.bg3Img, 0, 0);

		switchGameState(gameStateManager.GAME_STATE_MAIN_GAME);
	}

	/**
	 Game state where player plays
	 */
	function gameStateMainGame() {
		//ConsoleLog.log("in main game");
		frameRateCounter.countFrames();

		update();
		draw();
	}

	//*** GAME LOGIC FUNCTIONS
	/**
	 Updates all objects
	 */
	function update() {
		updateEnemies();
		updateBullets();
	}

	// Checks if letter input is valid based on the words currently on the field
	function checkInput(ch) {
		for(var i = 0; i < textList.length; i++) {
			if(targetText == "") {
				if(ch == textList[i].charAt(0)) {
					targetText = textList[i];
					targetEnemy = enemyList[i];
					enemyList[i].hits++;

					return true;
				}
			} else if(progressIndex < targetText.length) {
				if(ch == targetText.charAt(progressIndex)) {
					progressIndex++;
					enemyList[i].hits++;
					return true;
				}
			} else if(progressIndex == targetText.length) {
				// create bullet to shoot at enemy
				bullet.startupBullet(GP.bulletImg, GP.C_WIDTH / 2 - GP.playerBaseImg.width / 2, GP.C_HEIGHT - GP.playerBaseImg.height - 10)
				bulletList.push(bullet);
			}
		}
	}

	//*** UPDATE FUNCTIONS
	function updateEnemies() {
		for(var i = 0; i < enemyList.length; i++) {
			enemyList[i].update(frameRateCounter.step);
		}

		if(inputtedText == targetText) {
			//enemyList.removeObject(targetEnemy);
			inputtedText = "";
			//targetText = "";
		}
	}

	function updateBullets() {
		for(var i = 0; i < bulletList.length; i++) {
			bulletList[i].update(frameRateCounter.step);
		}
	}

	/**
	 Draws all objects
	 */
	function draw() {
		bg1.draw(context);
		bg2.draw(context);
		bg3.draw(context);
		for(var i = 0; i < enemyList.length; i++) {
			enemyList[i].draw(context);
		}
		for(var i = 0; i < bulletList.length; i++) {
			bulletList[i].draw(context);
		}
		playerBase.draw(context);
		drawText();
	}

	// Draws the text inputted by user
	function drawText() {
		var textWidth = context.measureText(inputtedText).width;
		context.fillText(inputtedText, GP.C_WIDTH / 2 - textWidth / 2, 500);
	}

	//*** UTILITY FUNCTIONS
	/**
	 Called after each time a resource is finished loading; after all resources have been loaded, switch to title screen
	 */
	function itemLoaded(event) {
		GP.loadCount++;
		ConsoleLog.log("loading:" + GP.loadCount)
		if(GP.loadCount >= GP.itemsToLoad) {
			switchGameState(gameStateManager.GAME_STATE_NEW_LEVEL);
		}
	}

	function findIntersection() {

		return 0;
	}

	/**
	 Removes a number of objects from the array
	 @param from The first object to remove
	 @param to (Optional) The last object to remove
	 */
	Array.prototype.remove = function(/**Number*/from, /**Number*/to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

	/**
	 Removes a specific object from the array
	 @param object The object to remove
	 */
	Array.prototype.removeObject = function(object) {
		for(var i = 0; i < this.length; ++i) {
			if(this[i] === object) {
				this.remove(i);
				break;
			}
		}
	}

	// on key press event function
	document.onkeypress = function(e) {
		e = e ? e : window.event;
		var c = String.fromCharCode(e.which);
		if(checkInput(c)) {
			inputtedText += c;
		}
	}

	//*** APPLICATION START
	switchGameState(gameStateManager.GAME_STATE_INIT);
	var frameRateCounter = new FrameRateCounter(GP.FPS);
	var intervalTime = 1000 / GP.FPS;
	setInterval(runGame, intervalTime);
}
