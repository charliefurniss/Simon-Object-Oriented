$(document).ready(function() {

	var board = new Board();
	var player = new Player();
	var simon = new Simon();
	var game = new Game();

	soundManager.setup({
	  url: 'js/soundmanager/swf',
	  flashVersion: 9
	});

	function init(){

		startIntro();

	}

	function startIntro(){
		board.setUpNameInputView();
		setUpPlayerNameListener();
	}	

	function setUpPlayerNameListener(){
		$(document).keypress(function(event){
			setUpPlayerNameHandler(event);
		})
	};

	function setUpPlayerNameHandler (event) {
		player.name = $('#nameInput').val().toLowerCase();
		if (event.which == 13) {
			startGame();
		}
	}

	function startGame(){
		board.clearNameInputWindow();
		board.setUpGame(player.name);
		simonTurn();	  	
	}

	function playerClick(){
		$('input').each(function(){
			$(this).on('click', function(){
				preventMultipleClick();
				handlePlayerClick($(this));
			})
		})
	};

	function preventMultipleClick () {
		$('input').off('click');
	}

	function handlePlayerClick (selectedElement) {
		board.registerPlayerClick(selectedElement.attr('class'));
		player.clickLog.push(selectedElement.attr('class'));
		assessClick();
	}

	function assessClick(){
		isPlayerClickCorrect() ? handleCorrectChoice() : handleIncorrectChoice();	
	}

	function isPlayerClickCorrect () {
		return (player.clickLog[player.clickNumber] == simon.clickLog[player.clickNumber]);
	}

	function handleCorrectChoice () {
		isStillPlayersTurn() ? continuePlayerTurn() : setUpSimonTurn();
	}

	function isStillPlayersTurn () {
		return player.clickLog.length < simon.clickLog.length;
	}

	function continuePlayerTurn () {
		player.clickNumber++;
		playerClick();
	}

	function increaseGameRound () {
		game.round++;
	}

	function resetPlayerTurnVariables () {
		player.clickLog.length = 0;
		player.clickNumber = 0;
	}

	function setUpSimonTurn () {
		resetPlayerTurnVariables();
		board.increasePlayerScoreDisplay(game.round);
		simonTurn();
		increaseGameRound();
	}

	function simonTurn(){
		setTimeout(function(){
			simon.button = board.generateSimonButton();
			simon.logColour();
			board.executeSimonTurn(simon.clickLog);					//registers computer choice with a flash and a sound
			playerClick();																	//calls player's turn 
		}, 2000);																		
	};

	function handleIncorrectChoice(){
		board.alertError();
		playAgainQuestion();
	}

	function playAgainQuestion(){
		$(document).keypress(function(event){
			if (playerAnswersYes(event)) {
				handlePlayerSelectingYes();
			}
			if (playerAnswersNo(event)) {
				handlePlayerSelectingNo();
			}
		})
	}

	function playerAnswersYes (event) {
		return event.which == 89 || event.which == 121;
	}

	function playerAnswersNo (event) {
		return event.which == 78 || event.which == 110;
	}

	function handlePlayerSelectingYes () {
		hideQuestion();
		setUpRepeatGame();					
		startGame();
	}

	function handlePlayerSelectingNo () {
		hideQuestion();
		restart();
	}

	function hideQuestion() {
		$('#question').text('');
		$('#question').slideUp();
	}

	function restart(){
		setTimeout(function(){
			board.showInfoWindow();
			resetGameVariables();
			startIntro();
		}, 2000);
	}

	function resetGameVariables(){
		createNewGameAndNewSimon();
		createNewPlayer();
	}

	function setUpRepeatGame(){
		createNewPlayerAndNewSimon();
		resetPlayer();
	}

	function createNewGameAndNewSimon() {
		game = new Game();
		simon = new Simon();
	}

	function createNewPlayer () {
		player = new Player();
	}

	function resetPlayer() {
		// player.click;				//player choice
		player.clickLog = [];		//log of player choices
		player.clickNumber = 0;		//counter for assessEachClick()
	}

	init();

});
