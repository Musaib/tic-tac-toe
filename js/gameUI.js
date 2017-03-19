

var game = (function () {


var player1, player2;

var gameUI = {
	screenStart: $('#start'),
	screenBoard: $('#board'),
	screenFinish: $('#finish'),
	currentPlayerO: true,
	box: $('.box'),

	startGame: function() {
		$(this.screenFinish).hide(); $(this.screenBoard).hide(); $(this.screenStart).show();
		$('header a.button').click(function(){ 
			game.newGame();
		});
	},

	switchPlayerTurns: function(){
		var check = $('.players').eq(0).hasClass('active');
		if(check){ 
			game.currentPlayerO = true;
			$('.boxes').removeClass('for-X').addClass('for-O');
		}else{
			game.currentPlayerO = false;
			$('.boxes').removeClass('for-O').addClass('for-X');
		}
	},

	newGame: function() {
		$(this.screenFinish).hide(); $(this.screenStart).hide(); $(this.screenBoard).show();
		$('.players').removeClass('active').eq(0).addClass('active');
		player1 = new Gamer();
		player2 = new Gamer();

		$(this.box).removeClass('box-filled-1 box-filled-2').addClass('empty');

		$('.boxes').addClass('for-O');
		$(this.box).click(function(e){ gameUI.gameStep(e); });
		//if((player2.combination.length>0 || player1.combination.length>0)){
		
		//}
	},

	gameStep: function(e){
		//`console.log(player1.gameEnd, player2.gameEnd);
		$this = $(e.target);
		var boxNoX = parseInt($this.attr('class').substr(1,1));
		var boxNoY = parseInt($this.attr('class').substr(2,1));

		if(gameUI.currentPlayerO){
			if($this.hasClass('empty')){
				$('.players').eq(0).removeClass('active').end().eq(1).addClass('active');  
				player1.setValues(boxNoX, boxNoY, 'O');
				$this.removeClass('empty').addClass('box-filled-1');
				if(player1 != null && player1.combination.length>0){
					gameUI.switchPlayerTurns();
				}
			}
		}else{ 
			if($this.hasClass('empty')){
				$('.players').eq(1).removeClass('active').end().eq(0).addClass('active'); 
				player2.setValues(boxNoX, boxNoY, 'X');
				$this.removeClass('empty').addClass('box-filled-2');
				if(player2 != null && player2.combination.length>0){
					gameUI.switchPlayerTurns();
				}
			}
		}

		if($('.boxes').find('.empty').length === 0){
			game.matchDraw();
		}

	},

	finishGame: function(player) {
		$(this.screenStart).hide(); $(this.screenBoard).hide(); $(this.screenFinish).show();
		if(player === 'O'){
			$('#finish').find('p').html('Winner');
			$(this.screenFinish).removeClass('winnerO winnerX').addClass('winnerO');
		}else if(player === 'X'){
			$('#finish').find('p').html('Winner');
			$(this.screenFinish).removeClass('winnerO winnerX').addClass('winnerX');
		}
		player1 = null;
		player2 = null;
		gameUI.currentPlayerO = true;
		$('.boxes').removeClass('for-X').addClass('for-O');
		$('#finish a.button').click(function(){ gameUI.startGame(); });
	},

	matchDraw: function(){
		$(this.screenStart).hide(); $(this.screenBoard).hide(); $(this.screenFinish).show();
		$('#finish').find('p').html('Its a Tie!').end().removeClass('winnerO winnerX').addClass('tie');
	},

	nextGame: function(){
		game.startGame();
	}

};

return gameUI;

})();