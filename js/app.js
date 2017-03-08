function Gamer(gridSize, combination) {

	this.gridSize = 3;
	this.combination = [];
	this.step = this.combination.length;
	this.currentPlayer = null;
	
	this.grid = [];
	for(var x=1; x<=this.gridSize; x++){
		this.grid[x] = [];
		for(var y=1; y<=this.gridSize; y++){
			this.grid[x][y] = "("+ x + "," + y +")";
		}
	}

	this.gameEnd = false;
	if(this.gameEnd){ gameUI.finishGame(); }

}

Gamer.prototype.setValues = function(x,y, player){

	this.currentPlayer = player;
	//console.log(this.currentPlayer);

	if(this.grid[x][y].search(/true/i) === -1){
		this.step++;
		this.grid[x][y] = "("+ x + "," + y +")" + " : true" ;
		this.combination.push(this.grid[x][y]);
		if(this.step >= this.gridSize){
			Gamer.prototype.checkValues(this.combination, this.currentPlayer);
		}
	}else{
		return false;
	}
};

Gamer.prototype.straights = function(strCut, axis, combo, player){

	this.currentPlayer = player;

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
  	console.log(this.currentPlayer + ' Won with a ' + axis +' Match');
  	gameUI.finishGame(this.currentPlayer);
  }

};

Gamer.prototype.diagonals = function(combo, player){

	this.currentPlayer = player;

	var xAxis, yAxis, same = 0;
	for(x=0; x<combo.length; x++){
		xAxis = combo[x].substr(1,1);
		yAxis = combo[x].substr(3,1);
		if(xAxis === yAxis){ same++; }
	}
	if(same === 3){
		console.log(this.currentPlayer + ' Won with a diagonal Match');
  	gameUI.finishGame(this.currentPlayer);
	}

};

Gamer.prototype.antiDiagonals = function(combo, player){

	this.currentPlayer = player;

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

	//console.log(combo);

	for(x=0; x<combo.length; x++){
		console.log(x);
		antiD.xAxis[x] = combo[x].substr(1,1);
		antiD.yAxis[x] = combo[x].substr(3,1);
		if( (parseInt(antiD.xAxis[x]) === AxAxis[x] && parseInt(antiD.yAxis[x]) === AyAxis[x]) || 
				(parseInt(antiD.xAxis[x]) === AyAxis[x] && parseInt(antiD.yAxis[x]) === AxAxis[x])
			) {
			same++;
			//console.log(same);
		}
	}
	
	console.log(antiD.xAxis, AxAxis, antiD.yAxis, AyAxis);
	
	if(same === 3){
		console.log(this.currentPlayer + ' Won with a Anti diagonal Match');
  	gameUI.finishGame(Gamer.currentPlayer);
	}

};

Gamer.prototype.checkValues = function(combo, player){
	Gamer.prototype.straights(3,'Vertical', combo, player);
	Gamer.prototype.straights(1,'Horizontal', combo, player);
	Gamer.prototype.diagonals(combo, player);
	Gamer.prototype.antiDiagonals(combo, player);
};

var player1 = new Gamer();
var player2 = new Gamer();