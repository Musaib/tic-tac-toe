var game = (function(){

	// Broken down into 2 pieces
	
	// 1. Game flow - used Object literal form as there is no need of instance.
	//              - contains all the flow and UI changes
	var gameFlow = {
		
		screenAll: $('body > div'),
		screenStart : $('#start'),
		screenPlay: $('#board'),
		screenEnd: $('#finish'),
		box: $('.box'),
		currentPlayerO: true,
		grid: [],
		gameEnd: false,

		hitStart: function(){

			this.screenAll.hide();
			this.screenPlay.show();
			var button = this.screenPlay.show().find('.button');

			$('.players').removeClass('active').eq(0).addClass('active');
			$('.boxes').removeClass('for-X').addClass('for-O');

			// layout everything
			for(var x=1; x<=3; x++){
				game.flow.grid[x] = [];
				for(var y=1; y<=3; y++){
					game.flow.grid[x][y] = x+","+y;
				}
			}
			game.flow.resetAll.call(game.pX);
			game.flow.resetAll.call(game.pO);
			this.box.removeClass('box-filled-1 box-filled-2').addClass('empty'); 
			$('.boxes').addClass('for-O');
			game.flow.currentPlayerO = true;
			$('.box').click(function(evt){ game.flow.gameOn(evt); });
		},

		resetAll: function(){
			this.combinations = [];
			this.step = [];
			this.turn = false;
			this.won = false;
		}, 

		gameOn: function(evt){
			var $this = $(evt.target),
					boxNoX = parseInt($this.attr('class').substr(1,1)),
					boxNoY = parseInt($this.attr('class').substr(2,1));
			if(game.flow.currentPlayerO){
				game.pX.turn = false;
				game.pO.turn = true;
				if($this.hasClass('empty')){
					$('.players').eq(0).removeClass('active').end().eq(1).addClass('active');  
					game.pO.set(boxNoX, boxNoY, 'O');
					$this.removeClass('empty').addClass('box-filled-1');
					if( (game.pO !== null) && (game.pO.combinations.length>0)){
						game.flow.switch();
					}
				}
			}else{
				game.pX.turn = true;
				game.pO.turn = false; 
				if($this.hasClass('empty')){
					$('.players').eq(1).removeClass('active').end().eq(0).addClass('active'); 
					game.pX.set(boxNoX, boxNoY, 'X');
					$this.removeClass('empty').addClass('box-filled-2');
					if((game.pX !== null) && (game.pX.combinations.length>0)){
						game.flow.switch();
					}
				}
			}
			if(($('.boxes').find('.empty').length === 0) &&
				 (game.pO.won === false) &&
				 (game.pX.won === false)){
				$('.players').removeClass('active');
	  		game.flow.hitEnd('Draw');
			}
		},

		switch: function(){
			var check = $('.players').eq(0).hasClass('active');
			if(check){ 
				game.flow.currentPlayerO = true;
				$('.boxes').removeClass('for-X').addClass('for-O');
			}else{
				game.flow.currentPlayerO = false;
				$('.boxes').removeClass('for-O').addClass('for-X');
			}
		},

		hitEnd: function(winner){
			var winy = winner;
			this.screenAll.hide();
			this.screenEnd.show();
			if(winy.name === 'O'){
				this.screenEnd.removeClass('winnerX').addClass('winnerO').find('.message').html('Winner');
			}else if(winy.name === 'X'){
				this.screenEnd.removeClass('winnerO').addClass('winnerX').find('.message').html('Winner');
			}else if(winy === 'Draw'){
				this.screenEnd.removeClass('winnerO').removeClass('winnerX').find('.message').html('Tie!');
			}
			var button = this.screenEnd.find('.button');
			button.click(function(){ game.flow.hitStart(); });
		},

		init: function(){
			this.screenAll.hide();
			this.screenStart.show();
			var button = this.screenStart.find('.button');
			button.click(function(){ game.flow.hitStart(); });
		}

	};

	// 2. Player - used Constructor form for creating 2 instances pX and pO from player. 
	//					 - contains the getters and setters for 2 instances of the players
	function Player(name){
		this.name= name;
		this.turn= false;
		this.won= false; 
		this.combinations= [];
		this.step= 0;
	}

	Player.prototype.set = function(x,y, player) {
		var curPlayer = player;

		if(game.flow.grid[x][y].search(/true/i) === -1){
			this.step++;
			game.flow.grid[x][y] = "("+ x + "," + y +")" + " : true" ;
			this.combinations.push(game.flow.grid[x][y]);
			if(this.step >= 3){
				Player.prototype.check(this.combinations, curPlayer);
			}
		}else{
			return false;
		}
	};

	Player.prototype.check = function(combo, player) {
		Player.prototype.gameStraights(3,'Vertical', combo, player);
		Player.prototype.gameStraights(1,'Horizontal', combo, player);
		Player.prototype.gameDiagonalLTR(combo, player);
		Player.prototype.gameDiagonalRTL(combo, player);
	};

	Player.prototype.gameStraights = function(strCut, axis, combo, player){ 
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
			game.flow.gameEnd = true;
	  	if(game.pO.turn === true){
	  		game.pO.won = true;
	  		game.flow.hitEnd(game.pO);
	  	}else{
	  		game.pX.turn = true;
	  		game.flow.hitEnd(game.pX);
	  	}
	  }
	};

	Player.prototype.gameDiagonalLTR = function(combo, player){
		this.currentPlayer = player;
		var xAxis, yAxis, same = 0;
		for(x=0; x<combo.length; x++){
			xAxis = combo[x].substr(1,1);
			yAxis = combo[x].substr(3,1);
			if(xAxis === yAxis){ same++; }
		}
		if(same === 3){
			game.flow.gameEnd = true;
	  	if(game.pO.turn === true){
	  		game.pO.won = true;
	  		game.flow.hitEnd(game.pO);
	  	}else{
	  		game.pX.turn = true;
	  		game.flow.hitEnd(game.pX);
	  	}
		}
	};

	Player.prototype.gameDiagonalRTL = function(combo, player){
		this.currentPlayer = player;
		var xAxis, yAxis, same = 0;
		var antiDiaCombination = [[1,3],[2,2],[3,1]];
		for(x=0; x<combo.length; x++){
			xAxis = combo[x].substr(1,1);
			yAxis = combo[x].substr(3,1);
			for(antiDiagX=0; antiDiagX<=2; antiDiagX++){
				if((parseInt(xAxis) === antiDiaCombination[antiDiagX][0])){ 
					for(antiDiagY=3; antiDiagY>0; antiDiagY--){  
						if( (parseInt(yAxis) === antiDiaCombination[antiDiagX][antiDiagY]) ){ 
							same++;
						}
					}
				} 
			}
		}
		if(same === 3){
			game.flow.gameEnd = true;
	  	if(game.pO.turn === true){
	  		game.pO.won = true;
	  		game.flow.hitEnd(game.pO);
	  	}else{
	  		game.pX.turn = true;
	  		game.flow.hitEnd(game.pX);
	  	}
		}
	};

	var pX = new Player('X');
	var pO = new Player('O');

	return {
		flow: gameFlow,
		pX: pX,
		pO: pO
	};

})();

// Initialising the game
game.flow.init();