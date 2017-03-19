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
	console.log(this.grid[x][y], this.currentPlayer);

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
  	this.gameEnd = true;
  	console.log(this.currentPlayer + ' Won with a ' + axis +' Match');
  	game.finishGame(this.currentPlayer);
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
		this.gameEnd = true;
		console.log(this.currentPlayer + ' Won with a diagonal Match');
  	game.finishGame(this.currentPlayer);
	}

};

Gamer.prototype.checkValues = function(combo, player){
	Gamer.prototype.straights(3,'Vertical', combo, player);
	Gamer.prototype.straights(1,'Horizontal', combo, player);
	Gamer.prototype.diagonals(combo, player);
};

game.startGame();