var Board = function(){

	function hideElement(id){
		$("#" + id).css("display", "none");
	}

	function showElement(id){
		$("#" + id).css("display", "block");
	}

	function slideDownElement(id) {
		$("#" + id).slideDown();
	}

	function changeText(id, message){
		$("#" + id).text(message);
	}

	function displayPlayerName(name){
		//adds name to h2 tage and the reveals the h2 previsouly hidden h2 tag
		$("#name").text(name + ": 0");
		$("#name").slideDown(name + ": 0");
	}

	function flashOn(buttonToFlash){
		$("." + buttonToFlash).css("background-color", $("." + buttonToFlash).attr('id'));

	}

	function flashOff(buttonToFlash){
		$("." + buttonToFlash).css("background-color", $("." + buttonToFlash).attr('value'));
	}

	function makeSound(soundURL){
		//plays the relevant sound when called either by the player or the computer
		mySound = soundManager.createSound({        
		  "url": soundURL
		});
		mySound.play();
	};

	this.clearNameInputWindow = function(){
		//on "RETURN" clears the infoWindow, disables keypress and calls setUpGame and startGame
		hideElement("enterName");
		hideElement("nameInput");
		$("#nameInput").val("");
		$(document).unbind("keypress");
	}

	this.showInfoWindow = function(){
		hideElement("board");
		slideDownElement("infoWindow");
	}

	this.intro = function(){
		this.showInfoWindow();
		slideDownElement("enterName");
		slideDownElement("nameInput");
		$("#nameInput").focus();  			//shows infoWindow	
	}

	this.setUpGame = function(playerName){
		displayPlayerName(playerName);
		//removes infoWindow
		hideElement("infoWindow");
		//after delay, shows the game board
		setTimeout(function(){
			showElement("board");
		}, 1000);
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
		  		makeSound($("." + simonLog[i]).attr("url"));
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
			makeSound($("." + buttonClass).attr("url"));
			setTimeout(function(){
				flashOff(buttonClass);
			}, 300);
		};

		this.increasePlayerScoreDisplay = function(playerName, round){
			$("h2").text(playerName + ": " + (round));
		}

		this.alertError = function(){
			var errorSoundURL = "audio/errorSound.mp3";
			makeSound(errorSoundURL);
			// replaces game board with info window
			this.showInfoWindow();
			changeText("message", "whoops!");
			setTimeout(function(){
				$("#message").slideUp(500, function(){
					changeText("message", "");
					showElement("message");
				});
				changeText("question", "do you want to play again (y/n)?");
				slideDownElement("question");
			}, 2000);
		}

	}
}