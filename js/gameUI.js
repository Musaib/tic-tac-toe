var gameUI = {
	screenStart: $('#start'),
	screenBoard: $('#board'),
	screenFinish: $('#finish'),
	currentPlayerO: true,
	box: $('.box'),

	startGame: function() {
		$(this.screenFinish).hide(); $(this.screenBoard).hide(); $(this.screenStart).show();
		$('header a.button').click(function(){ gameUI.newGame(); });
	},

	switchPlayerTurns: function(){
		var check = $('.players').eq(0).hasClass('active');
		if(check){ 
			gameUI.currentPlayerO = true;
			$('.boxes').removeClass('for-X').addClass('for-O');
		}else{
			gameUI.currentPlayerO = false;
			$('.boxes').removeClass('for-O').addClass('for-X');
		}
	},

	newGame: function() {
		$(this.screenFinish).hide(); $(this.screenStart).hide(); $(this.screenBoard).show();
		gameUI.switchPlayerTurns();
		gameUI.gameReset();
		$(this.box).click(function(e){ gameUI.gameStep(e); });
	},

	gameStep: function(e){
		$this = $(e.target);
		var boxNoX = parseInt($this.attr('class').substr(11,1));
		var boxNoY = parseInt($this.attr('class').substr(12,1));

		if(gameUI.currentPlayerO){ 
			if($this.hasClass('empty')){
				$this.removeClass('empty').addClass('box-filled-1');
				$('.players').eq(0).removeClass('active').end().eq(1).addClass('active'); 
				player1.setValues(boxNoX, boxNoY, 'O');
				gameUI.switchPlayerTurns();
			}
		}else{ 
			if($this.hasClass('empty')){
				$this.removeClass('empty').addClass('box-filled-2');
				$('.players').eq(1).removeClass('active').end().eq(0).addClass('active'); 
				player2.setValues(boxNoX, boxNoY, 'X');
				gameUI.switchPlayerTurns();
			}
		}

		if($('.boxes').find('.empty').length === 0){
			gameUI.matchDraw();
		}

	},

	gameReset: function(e){

		$('.boxes').find('li').removeClass('box-filled-1').addClass('empty');
		$('.boxes').find('li').removeClass('box-filled-2').addClass('empty');

	},

	finishGame: function(player) {
		$(this.screenStart).hide(); $(this.screenBoard).hide(); $(this.screenFinish).show();
		if(player === 'O'){
			$(this.screenFinish).addClass('winnerO');
		}else if(player === 'X'){
			$(this.screenFinish).addClass('winnerX');
		}
		$('#finish a.button').click(function(){ gameUI.startGame(); });
	},

	matchDraw: function(){
		$(this.screenStart).hide(); $(this.screenBoard).hide(); $(this.screenFinish).show();
		$('#finish').find('p').html('Its a Tie!');
	},

	nextGame: function(){
		gameUI.startGame();
		gameUI.switchPlayerTurns();
		gameUI.gameReset();
	}

};

gameUI.startGame();