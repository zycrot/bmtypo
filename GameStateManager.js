// GameStateManager.js

function GameStateManager() {
	// application states
	this.GAME_STATE_INIT = 0;
	this.GAME_STATE_LOADING = 10;
	this.GAME_STATE_TITLE = 20;
	this.GAME_STATE_NEW_LEVEL = 30;
	this.GAME_STATE_MAIN_GAME = 40;

	/**
	 Current screen state
	 @type string
	 */
	this.currentGameState = null;
}

/**
 Assigns newState param to currentGameStateFunction
 @param newState String of current state function
 */
GameStateManager.prototype.switchGameState = function(newState) {
	this.currentGameState = newState;
}
