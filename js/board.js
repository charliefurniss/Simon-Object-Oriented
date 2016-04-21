console.log("board.js working");
var Board = function(){
	this.intro = function(){
		$("#board").css("display", "none");  	//moves board out
		$("#infoWindow").slideDown();
		$("#enterName").slideDown();
		$("#nameInput").slideDown();
		$("#nameInput").focus();  			//shows infoWindow	
	}

	this.setUpGame = function(playerName){
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
}