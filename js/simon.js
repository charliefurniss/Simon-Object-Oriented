var Simon = function(){

	this.clickLog = [];
	this.button;

	this.logColour = function(){
		this.clickLog.push(this.button.attr('class')); //logs computer colour in clickLog array
	}

}