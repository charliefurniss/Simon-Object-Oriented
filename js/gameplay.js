$(document).ready(function() {

	soundManager.setup({
	  url: 'js/soundmanager/swf',
	  flashVersion: 9,
	  onready: init
	});

	function init(){

		var board = new Board();
		var player = new Player();
		var simon = new Simon();
		var game = new Game();

		startIntro();

		function startIntro(){
			board.intro();
			enterPlayerName();
		}	

		function enterPlayerName(){
			$(document).keypress(function(e){
				//accepts players name and stores into playerName
				player.name = $("#nameInput").val().toLowerCase();
				if (e.which == 13) {
					startGame();
				}	
			})
		};

		function startGame(){
			board.clearNameInputWindow();
			board.setUpGame(player.name);
  		simonTurn();	  	
		}
		
		function simonTurn(){
			//after delay shows first computer colour flash
			setTimeout(function(){
				simon.button = board.generateSimonButton();
				simon.logColour();
				board.simonFlashSound(simon.clickLog);					//registers computer choice with a flash and a sound
				playerClick();																	//calls player's turn 
			}, 2000);																		
		};

		function playerClick(){
			//sets up listeners on each input element
			$("input").each(function(){
				$(this).on("click", function(){
					//when one of these elements is clicked...
					//...switch off the click listener
					$("input").off("click");
					//...store the choice of click in player.click variable
					player.click = $(this);
					//...register choice with flash and sound
					board.registerPlayerClick(player.click.attr('class'));	
					//...store player choice in array
					player.clickLog.push(player.click.attr('class'));
					assessEachClick();
				})
			})
		};

		function playerTurn(){
			//triggers the computer's turn once the player has made enough clicks
			if (player.clickLog.length < simon.clickLog.length) {
				player.clickNumber++;
				playerClick();
			} else {
				board.increasePlayerScoreDisplay(player.name, game.round)
				game.round++;									//increases round for the player's score				
				player.clickLog.length = 0;
				player.clickNumber = 0;
				simonTurn();
			}
		}

		function assessEachClick(){
			console.log("assess");
			//compares each player click with its respective computer click, allowing the player to continue if it's correct and stopping the game if not
			if (player.clickLog[player.clickNumber] == simon.clickLog[player.clickNumber]){	
				playerTurn();
			} else {
				createError();
			}	
		}

		function createError(){
			board.alertError();
			playAgainQuestion();
		}

		function resetGameVariables(){
			player = new Player();
			simon = new Simon();
			game = new Game();
		}

		function repeatGameResetVariables(){
			simon = new Simon();
			game = new Game();
			player.click;				//player choice
			player.clickLog = [];		//log of player choices
			player.clickNumber = 0;		//counter for assessEachClick()
		}

		function restart(){
			setTimeout(function(){
				board.showInfoWindow();
				resetGameVariables();
				startIntro();
			}, 2000);
		}

		function playAgainQuestion(){
			$(document).keypress(function(e){
				if (e.which == 89 || e.which == 121) {
					$("#question").text("");
					repeatGameResetVariables();					
					startGame();
					$("#question").slideUp()
					// restart();
				}	else if (e.which == 78 || e.which == 110) {
					$("#question").slideUp()
					restart();	
				}
			})
		}
	}
});
