$(document).ready(function() {

	soundManager.setup({
	  url: 'js/soundmanager/swf',
	  flashVersion: 9,
	  onready: start
	});

	function start(){
		var simonButton;						//computer colour choice
		var simonLog = [];					//log of computer choices
		var playerClick;						//player choice
		var playerClickLog = [];		//log of player choices
		var playerClickNumber = 0;	//counter for assessEachClick()

		var round = 1;
		var playerName;
		var faultSound = ["audio/faster.wav"];

		intro();

		function intro(){
			$("#board").css("display", "none");  //moves board out
			$("#infoWindow").slideDown();  				//shows infoWindow
			enterPlayerName();	
		}	

		function enterPlayerName(){
			//the following show elements for player to enter name
			$("#infoWindow").slideDown();
			$("#enterName").slideDown();
			$("#nameInput").slideDown();
			$("#nameInput").focus();
			$(document).keypress(function(e){
				//accepts players name and stores into playerName
				playerName = $("#nameInput").val().toLowerCase();
				if (e.which == 13) {
					//on "RETURN" clears the infoWindow, disables keypress and calls setUpGame and startGame
					$("#enterName").css("display", "none");
					$("#nameInput").css("display", "none");
					$("#nameInput").val("");
					$(document).unbind("keypress");
					setUpGame();
					startGame();
				}	
			})
		};

		function setUpGame(){
			//resets variables needed for gameplay
			simonButton = "";
			simonLog = [];
			playerClick = "";
			playerClickLog = [];
			playerClickNumber = 0;
			round = 1;

			displayPlayerName(playerName);
			//removes infoWindow
			$("#infoWindow").css("display", "none");
			//after delay, shows the game board
			setTimeout(function(){
				$("#board").css("display", "block");
			}, 1000);
		}

		function displayPlayerName(name){
			//adds name to h2 tage and the reveals the h2 previsouly hidden h2 tag
			$("h2").text(name + ": 0");
			$("h2").slideDown(name + ": 0");
		}

		function startGame(){
			//after delay shows first computer colour flash
			setTimeout(function(){
				simonLog = [];
				console.log(simonLog + " at start");
  			colourGenerator();
	  	}, 2000);	
		}
		
		function colourGenerator(){
			//stores listeners on each button into variables
			var redButton = $(".red");
			var greenButton = $(".green");
			var blueButton = $(".blue");
			var yellowButton = $(".yellow");
			//chooses computer button randomly and assigns it to simonButton
			var randomNumber = Math.random() * 4;
			
			if (randomNumber <= 1) {
				simonButton = redButton;
			} else if (randomNumber <= 2) {
				simonButton = greenButton;
			} else if (randomNumber <= 3) {
				simonButton = blueButton;
			} else {
				simonButton = yellowButton;
			}

			//logs computer choice in simonLog array
			simonLog.push(simonButton.attr('class'));
			//registers computer choice with a flash and a sound
			simonFlashSound();
			//calls player's turn 
			pClick();
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
					colourGenerator();
				}, 1000);
			}
		}

		///BUG IS IN THIS FUNCTION I THINK
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
						intro();
					}, 2000);
				}
				
				else if (e.which == 78 || e.which == 110) {
					$("#question").slideUp()
					setTimeout(function(){
						$("#infoWindow").slideDown();
						intro();
					}, 2000);	
				}
			})
		}
	}
});
