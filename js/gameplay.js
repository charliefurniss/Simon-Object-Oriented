$(document).ready(function() {

	soundManager.setup({
	  url: 'js/soundmanager/swf',
	  flashVersion: 9,
	  onready: init
	});

	function init(){

		var board = new Board();

		var simonButton;						//computer colour choice
		var simonLog = [];					//log of computer choices
		var playerClick;						//player choice
		var playerClickLog = [];		//log of player choices
		var playerClickNumber = 0;	//counter for assessEachClick()
		var round = 1;
		var playerName;
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
					//on "RETURN" clears the infoWindow, disables keypress and calls setUpGame and startGame
					$("#enterName").css("display", "none");
					$("#nameInput").css("display", "none");
					$("#nameInput").val("");
					$(document).unbind("keypress");
					board.setUpGame(playerName);
					startGame();
				}	
			})
		};

		function startGame(){
			//after delay shows first computer colour flash
			setTimeout(function(){
  			computerTurn();
	  	}, 2000);	
		}
		
		function computerTurn(){
			var simonButton = board.generateSimonButton();
			simonLog.push(simonButton.attr('class')); //logs computer choice in simonLog array
			simonFlashSound();												//registers computer choice with a flash and a sound
			pClick();																	//calls player's turn 
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
					playerFlashSound(playerClick.attr('class'));	
					//store player choice in array
					playerClickLog.push(playerClick.attr('class'));
					assessEachClick();
				})
			})
		};

		function assessEachClick() {
			//compares each player click with its respective 
			//computer click, allowing the player to 
			//continue if it's correct and stopping the game 
			//if not
			if (playerClickLog[playerClickNumber] == simonLog[playerClickNumber]){	
				playerTurn();
			} else {
				alertError();
			}	
		}

		function playerTurn(){
			//triggers the computer's turn once the player has 
			//made enough clicks
			if (playerClickLog.length < simonLog.length) {
				playerClickNumber++;
				pClick();
			} else {
				$("h2").text(playerName + ": " + (round));
				round++;		//increases round for the player's score
				playerClickLog.length = 0;
				playerClickNumber = 0;
				setTimeout(function(){
					computerTurn();
				}, 1000);
			}
		}

		function simonFlashSound(){
			//cycles through the computer log to make the 
			//correct button flash in the sequence
			for (i = 0; i < simonLog.length; i++) {
				//this function allows the timeout functions to work within the for loop
				(function(i){
				  setTimeout(function(){
				    //flash on       
			  		$("." + simonLog[i]).css("background-color", $("." + simonLog[i]).attr('id'));
			  		makeSound($("." + simonLog[i]).attr('url'));
			  		setTimeout(function(){
			  			//flash off
				  		$("." + simonLog[i]).css("background-color", $("." + simonLog[i]).attr('value'));
				  	}, 300);				  			
					}, 500 * i);
				}(i));
			};		
		}

		function playerFlashSound(buttonClass){
			//flashes and sounds on every player click
			$("." + buttonClass).css("background-color", $("." + buttonClass).attr('id'));
			makeSound($("." + buttonClass).attr('url'));
			setTimeout(function(){
				$("." + buttonClass).css("background-color", $("." + buttonClass).attr('value'));
			}, 300);
		};

		function wrongSound(){
			//plays error sound when player makes a wrong move
			eSound = soundManager.createSound({
			  "url": "audio/errorSound.mp3"
			});
			eSound.play();
		};

		function makeSound(buttonURL){
			//plays the relevant sound when called either by the player or the computer
			mySound = soundManager.createSound({        
			  "url": buttonURL
			});
			mySound.play();
		};

		function alertError(){
			console.log(simonLog + " at alert");
			//resets all variables, makes error sound and replaces board with infoWindow
			simonButton = "";
			simonLog = [];
			playerClick = "";
			playerClickLog = [];
			playerClickNumber = 0;
			round = 1;
			wrongSound();

			$("#board").css("display", "none");
			$("#infoWindow").slideDown();
			playAgain();
		}

		function playAgain(){
			//asks player if they want to play again, restarting the game if they say "yes" and resetting the game if they say "no"
			$("#message").text("whoops!");
			setTimeout(function(){
				$("#message").slideUp(500, function(){
					$("#message").text("");
					$("#message").css("display", "block");
				});
				$("#question").text("do you want to play again (y/n)?");
				$("#question").slideDown();
			}, 2000);

			$(document).keypress(function(e){
				if (e.which == 89 || e.which == 121) {
					// $("#question").text("");
					// simonLog = [];
					// setUpGame();
					// startGame();
					$("#question").slideUp()
					setTimeout(function(){
						$("#infoWindow").slideDown();
						startIntro()
					}, 2000);
				}
				
				else if (e.which == 78 || e.which == 110) {
					$("#question").slideUp()
					setTimeout(function(){
						$("#infoWindow").slideDown();
						startIntro()
					}, 2000);	
				}
			})
		}
	}
});
