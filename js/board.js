console.log("board.js working");
var Board = function(){
	this.intro = function(){
		$("#board").css("display", "none");  	//moves board out
		$("#infoWindow").slideDown();
		$("#enterName").slideDown();
		$("#nameInput").slideDown();
		$("#nameInput").focus();  			//shows infoWindow	
	}
}