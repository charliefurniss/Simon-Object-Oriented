$(document).ready(function() {

	soundManager.setup({
	  url: 'js/soundmanager/swf',
	  flashVersion: 9,
	  onready: init
	});

	function init(){

		var board = new Board();
		var playerName = "";
		var simonLog = [];					//log of computer choices
		var playerClick;						//player choice
		var playerClickLog = [];		//log of player choices
		var playerClickNumber = 0;	//counter for assessEachClick()
		var round = 1;
		var faultSound = ["audio/faster.wav"];

		startIntro();

		function startIntro(){
			board.intro();
			enterPlayerName();
		}	

		function enterPlayerName(){
			$(document).keypress(function(e){
				//accepts players name and stores into playerName
				playerName = $("#nameInput").val().toLowerCase();
				if (e.which == 13) {
					board.clearNameInputWindow();
					board.setUpGame(playerName);
					startGame();
				}	
			})
		};

		function startGame(){
  		computerTurn();	  	
		}
		
		function computerTurn(){
			//after delay shows first computer colour flash
			setTimeout(function(){
				var simonButton = board.generateSimonButton();
				simonLog.push(simonButton.attr('class')); //logs computer choice in simonLog array
				board.simonFlashSound(simonLog);					//registers computer choice with a flash and a sound
				pClick();
			}, 2000);																		//calls player's turn 
		};

		function pClick(){
			//sets up listeners on each input element
			$("input").each(function(){
				$(this).on("click", function(){
					//when one of these elements is clicked...
					//...switch off the click listener
					$("input").off("click");
					//store the choice of click in playerClick variable
					playerClick = $(this);
					//register choice with flash and sound
					board.registerPlayerClick(playerClick.attr('class'));	
					//store player choice in array
					playerClickLog.push(playerClick.attr('class'));
					assessEachClick();
				})
			})
		};

		function playerTurn(){
			//triggers the computer's turn once the player has made enough clicks
			if (playerClickLog.length < simonLog.length) {
				playerClickNumber++;
				pClick();
			} else {
				board.increasePlayerScore(playerName, round)
				round++;								//increases round for the player's score				
				playerClickLog.length = 0;
				playerClickNumber = 0;
				computerTurn();
			}
		}

		function assessEachClick(){
			console.log("assess");
			//compares each player click with its respective computer click, allowing the player to continue if it's correct and stopping the game if not
			if (playerClickLog[playerClickNumber] == simonLog[playerClickNumber]){	
				playerTurn();
			} else {
				board.alertError();
				playAgainQuestion();
			}	
		}

		function resetGameVariables(){
			simonLog = [];
			playerClick = "";
			playerClickLog = [];
			playerClickNumber = 0;
			round = 1;
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
					// $("#question").text("");
					// simonLog = [];
					// setUpGame();
					// startGame();
					$("#question").slideUp()
					restart();
				}	else if (e.which == 78 || e.which == 110) {
					$("#question").slideUp()
					restart();	
				}
			})
		}
	}
});
