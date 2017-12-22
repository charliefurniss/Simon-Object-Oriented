var Board = function(){

	this.clearNameInputWindow = function(){
		hideElement('enterName');
		hideElement('nameInput');
		$('#nameInput').val('');
		$(document).unbind('keypress');
	}

	this.showInfoWindow = function(){
		hideElement('board');
		slideDownElement('infoWindow');
	}

	this.setUpNameInputView = function(){
		this.showInfoWindow();
		slideDownElement('enterName');
		slideDownElement('nameInput');
		$('#nameInput').focus();  			//shows infoWindow	
	}

	this.setUpGame = function(playerName){
		displayPlayerName(playerName);
		//removes infoWindow
		hideElement('infoWindow');
		//after delay, shows the game board
		setTimeout(function(){
			showElement('board');
		}, 1000);
	}

	this.generateSimonButton = function(){
		//chooses computer button randomly and assigns it to simonButton
		var randomNumber = Math.random() * 4;

		if (randomNumber <= 1) {
			simonButton = $('.red');
		} else if (randomNumber <= 2) {
			simonButton = $('.green');
		} else if (randomNumber <= 3) {
			simonButton = $('.blue');
		} else {
			simonButton = $('.yellow');
		}

		return simonButton;
	}

	this.executeSimonTurn = function(simonLog){
		//cycles through the computer log to make the 
		//correct button flash in the sequence
		for (i = 0; i < simonLog.length; i++) {
			//this function allows the timeout functions to work within the for loop
			(function(i){
				setTimeout(function(){
					//flash on       
					flashOn(simonLog[i]);
					makeSound($('.' + simonLog[i]).attr('url'));
					setTimeout(function(){
						//flash off
						flashOff(simonLog[i]);
					}, 300);				  			
				}, 500 * i);
			}(i));
		};
	}

	this.registerPlayerClick = function(buttonClassName){
		var soundUrl = generateSoundUrl(buttonClassName);

		makeSound(soundUrl);
		makeFlash(buttonClassName);
	};

	function generateSoundUrl (buttonClassName) {
		return $('.' + buttonClassName).attr('url');
	}

	function makeFlash (buttonClassName) {
		var elementToFlash = $('.' + buttonClassName);
		flashOn(elementToFlash);
		setTimeout(function(){
			flashOff(elementToFlash);
		}, 300);
	}

	function flashOn(elementToFlash){
		elementToFlash.css('background-color', elementToFlash.attr('id'));
	}

	function flashOff(elementToFlash){
		elementToFlash.css('background-color', elementToFlash.attr('value'));
	}

	this.increasePlayerScoreDisplay = function(round){
		$('#playerScore').text(round);
	}

	this.alertError = function(){
		var errorSoundURL = 'audio/errorSound.mp3';
		makeSound(errorSoundURL);
		// replaces game board with info window
		this.showInfoWindow();
		changeText('message', 'whoops!');
		setTimeout(function(){
			$('#message').slideUp(500, function(){
				changeText('message', '');
				showElement('message');
			});
			changeText('question', 'do you want to play again (y/n)?');
			slideDownElement('question');
		}, 2000);
	}

	function hideElement(id){
		$('#' + id).css('display', 'none');
	}

	function showElement(id){
		$('#' + id).css('display', 'block');
	}

	function slideDownElement(id) {
		$('#' + id).slideDown();
	}

	function changeText(id, message){
		$('#' + id).text(message);
	}

	function displayPlayerName(name){
		//adds name to h2 tage and the reveals the h2 previsouly hidden h2 tag
		$('#playerName').text(name);
		$('h2').slideDown();
	}

	function makeSound(soundURL){
		mySound = soundManager.createSound({        
			'url': soundURL
		});
		mySound.play();
	};

}