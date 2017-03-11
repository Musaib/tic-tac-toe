var game = (function(){
	
	var gamer = {
		screenStart: $('#start'),
		screenBoard: $('#board'),
		screenFinish: $('#finish'),
		currentPlayerO: true 
	};

	gamer.onStart = function(){
		console.log( game.screenStart, 'Started' );
		game.screenBoard.hide();
		game.screenFinish.hide();
		game.screenStart.show();
	};

	gamer.onBoard = function(){
		console.log( game.screenBoard, 'Boarded' );
		game.screenFinish.hide();
		game.screenStart.hide();
		game.screenBoard.show();
	};

	gamer.onFinish = function(){
		console.log( game.screenFinish, 'Finished' );
		game.screenStart.hide();
		game.screenBoard.hide();
		game.screenFinish.show();
	};

	gamer.currentPlayer = function(){
		var check = $('.players').eq(0).hasClass('active');
		if(check){ 
			gamer.currentPlayerO = true;
			$('.boxes').removeClass('for-X').addClass('for-O');
		}else{
			gamer.currentPlayerO = false;
			$('.boxes').removeClass('for-O').addClass('for-X');
		}
	};

	gamer.move = function(){
		var player1 = [];
		var player2 = [];
		var winRow1 = [11,12,13];
		var winRow2 = [21,22,23];
		var winRow3 = [31,32,33];
		var winCol1 = [11,21,31];
		var winCol2 = [12,22,32];
		var winCol3 = [13,23,33];
		var winDia1 = [11,21,33];
		var winDia2 = [13,22,31];
	};

	return gamer;

}());

var player1 = new gamer();

game.onStart();

$('.screen-start').find('a').on('click', function(){
	game.onBoard();
	game.currentPlayer();
});

$('.box').on('click', function(){
	$this = $(this);
	var boxNo = $this.attr('class');

	if(game.currentPlayerO){ 
		$this.removeClass('empty').addClass('box-filled-1');
		$('.players').eq(0).removeClass('active').end().eq(1).addClass('active'); 
		game.currentPlayer();
	}else{ 
		$this.removeClass('empty').addClass('box-filled-2');
		$('.players').eq(1).removeClass('active').end().eq(0).addClass('active'); 
		game.currentPlayer();
	}
});