//"use strict";

function Gamer(gridSize, combination) {

	this.gridSize = 3;
	this.combination = [];
	this.step = this.combination.length;
	
	this.grid = [];
	for(var x=1; x<=this.gridSize; x++){
		this.grid[x] = [];
		for(var y=1; y<=this.gridSize; y++){
			this.grid[x][y] = "("+ x + "," + y +")";
		}
	}

	this.gameEnd = false;

}

Gamer.prototype.setValues = function(x,y){
	if(this.grid[x][y].search(/true/i) === -1){
		this.step++;
		this.grid[x][y] = "("+ x + "," + y +")" + " : true" ;
		this.combination.push(this.grid[x][y]);
		if(this.step >= this.gridSize){
			Gamer.prototype.checkValues(this.combination);
		}
	}else{
		return false;
	}
};

Gamer.prototype.straights = function(strCut, axis, combo){

	var playerCombo = [];
	for(x=0; x<combo.length; x++){
		playerCombo[x] = combo[x].substr(strCut,1);
	}

	var repeat = [], counts = [], prev;
	playerCombo.sort();
  for(var j = 0; j < playerCombo.length; j++){
      if(playerCombo[j] !== prev) {
        repeat.push(playerCombo[j]); counts.push(1);
      }else{
        counts[counts.length-1]++;
      }
      prev = playerCombo[j];
  } 

  if (counts.indexOf(3) !== -1){ 
  	console.log('Won with a ' + axis +' Match');
  	this.gameEnd = true;
  }

};

Gamer.prototype.diagonals = function(combo){

	var xAxis, yAxis, same = 0;
	for(x=0; x<combo.length; x++){
		xAxis = m.combination[x].substr(1,1);
		yAxis = m.combination[x].substr(3,1);
		if(xAxis === yAxis){ same++; }
	}
	if(same === 3){
		console.log('Won with a diagonal Match');
  	this.gameEnd = true;
	}

};

Gamer.prototype.antiDiagonals = function(combo){

	var antiD = {}, AxAxis = [], AyAxis = [], same = 0;

	antiD.xAxis = [];
	for(var x=1; x<=3; x++){
		antiD.xAxis.push(x);
	}

	antiD.yAxis = [];
	for(var y=3; y>=1; y--){
		antiD.yAxis.push(y);
	}

	for(x=0; x<antiD.xAxis.length; x++){
		AxAxis[x] = antiD.xAxis[x];
		AyAxis[x] = antiD.yAxis[x];
	}

	for(x=0; x<combo.length; x++){
		xAxis = m.combination[x].substr(1,1);
		yAxis = m.combination[x].substr(3,1);
		if(parseInt(xAxis) === AxAxis[x] && parseInt(yAxis) === AyAxis[x]){
			same++;
		}
	}
	
	if(same === 3){
		console.log('Won with a Anti diagonal Match');
  	this.gameEnd = true;
	}

};

Gamer.prototype.checkValues = function(combo){
	Gamer.prototype.straights(3,'Horizontal', combo);
	Gamer.prototype.straights(1,'Vertical', combo);
	Gamer.prototype.diagonals(combo);
	Gamer.prototype.antiDiagonals(combo);
};

var player1 = new Gamer();
var player2 = new Gamer();