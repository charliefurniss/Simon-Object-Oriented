console.log("board.js working");
var Board = function(){

	function clearWindow(window){
		$("#" + window).css("display", "none");
	}

	this.clearNameInputWindow = function(){
		//on "RETURN" clears the infoWindow, disables keypress and calls setUpGame and startGame
		clearWindow("enterName");
		clearWindow("nameInput");
		$("#nameInput").val("");
		$(document).unbind("keypress");
	}

	this.showInfoWindow = function(){
		clearWindow("board");
		$("#infoWindow").slideDown();
	}

	this.intro = function(){
		this.showInfoWindow();
		$("#enterName").slideDown();
		$("#nameInput").slideDown();
		$("#nameInput").focus();  			//shows infoWindow	
	}

	this.setUpGame = function(playerName){
		displayPlayerName(playerName);
		//removes infoWindow
		clearWindow("infoWindow");
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


	this.generateSimonButton = function(){
		//chooses computer button randomly and assigns it to simonButton
		var randomNumber = Math.random() * 4;
		if (randomNumber <= 1) {
			simonButton = $(".red");
		} else if (randomNumber <= 2) {
			simonButton = $(".green");
		} else if (randomNumber <= 3) {
			simonButton = $(".blue");
		} else {
			simonButton = $(".yellow");
		}
		return simonButton;
	}

		this.simonFlashSound = function(simonLog){
		//cycles through the computer log to make the 
		//correct button flash in the sequence
		for (i = 0; i < simonLog.length; i++) {
			//this function allows the timeout functions to work within the for loop
			(function(i){
			  setTimeout(function(){
			    //flash on       
		  		flashOn(simonLog[i]);
		  		makeSound($("." + simonLog[i]).attr('url'));
		  		setTimeout(function(){
		  			//flash off
			  		flashOff(simonLog[i]);
			  	}, 300);				  			
				}, 500 * i);
			}(i));
		};

		this.registerPlayerClick = function(buttonClass){
			//flashes and sounds on every player click
			flashOn(buttonClass);
			makeSound($("." + buttonClass).attr('url'));
			setTimeout(function(){
				flashOff(buttonClass);
			}, 300);
		};

		function flashOn(buttonToFlash){
			$("." + buttonToFlash).css("background-color", $("." + buttonToFlash).attr('id'));

		}

		function flashOff(buttonToFlash){
			$("." + buttonToFlash).css("background-color", $("." + buttonToFlash).attr('value'));
		}

		function makeSound(buttonURL){
			//plays the relevant sound when called either by the player or the computer
			mySound = soundManager.createSound({        
			  "url": buttonURL
			});
			mySound.play();
		};

		this.increasePlayerScore = function(playerName, round){
			$("h2").text(playerName + ": " + (round));
		}

		this.playErrorSound = function(){
			//plays error sound when player makes a wrong move
			eSound = soundManager.createSound({
			  "url": "audio/errorSound.mp3"
			});
			eSound.play();
		};

		this.alertError = function(){
			this.playErrorSound();
			// replaces game board with info window
			this.showInfoWindow();

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
		}

	}
}