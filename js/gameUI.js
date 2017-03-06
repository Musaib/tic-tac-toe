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
		$(this.box).click(function(e){ gameUI.gameStep(e); });
	},

	gameStep: function(e){
		$this = $(e.target);
		var boxNo = $this.attr('class');

		if(gameUI.currentPlayerO){ 
			$this.removeClass('empty').addClass('box-filled-1');
			$('.players').eq(0).removeClass('active').end().eq(1).addClass('active'); 
			player1.setValues(1,2);
			gameUI.switchPlayerTurns();
		}else{ 
			$this.removeClass('empty').addClass('box-filled-2');
			$('.players').eq(1).removeClass('active').end().eq(0).addClass('active'); 
			player1.setValues(2,1);
			gameUI.switchPlayerTurns();
		}
	},

	finishGame: function() {
		$(this.screenStart).hide(); $(this.screenBoard).hide(); $(this.screenFinish).show(); 
	},

	showWinner: function(){
		console.log('Musaib');
	}

};

gameUI.startGame();