
var mainMenuDiv = $("#mainMenu");
var playerInfoDiv = $("#playerInfo");
var gameOverDiv = $("#gameOver");
var profileDiv = $("#profile");
var optionDiv = $("#options");

function hideAll(){
	mainMenuDiv.fadeOut();
	playerInfoDiv.fadeOut();
	gameOverDiv.fadeOut();
	profileDiv.fadeOut();
	optionDiv.fadeOut();
}

function showProfile(){
	hideAll();
	profileDiv.fadeIn();
}

function showOptions(){
	hideAll();
	optionDiv.fadeIn();
}

function showMainMenu(){
	hideAll();
	mainMenuDiv.fadeIn();
}

function startGame(){
	hideAll();

    init();
	playerInfoDiv.fadeIn();
    gameOverDiv.removeClass("isGameOver");
}

function gameOver(){
    if(!gameOverDiv.hasClass("isGameOver")){
        gameOverDiv.addClass("isGameOver");
        gameOverDiv.fadeIn();
        $("#gameOverCoin").html(mainPlayer.Score);
        $("#gameOverKill").html(mainPlayer.Kills);
    }
}

// LISTENER
$(document).on("click", "#profileButton", function(){
	showProfile();
});

$(document).on("click", "#optionsButton", function(){
	showOptions();
});

$(document).on("click", ".startButton", function(){
	startGame();
});

$(document).on("click", ".mainMenuButton", function(){
	showMainMenu();
});

// UI

function setPlayerHealth(value){
		 $("#currentHealth").removeClass("normal medium low");
		 if(value < 20){
				 $("#currentHealth").addClass("low");
		 }else if(value < 40){
				 $("#currentHealth").addClass("medium");
		 }else{
				 $("#currentHealth").addClass("normal");
		 }
		 $("#currentHealth").css("width", value +"%");
}

function setPlayerUlti(value, canUseIt){
		progressBarUpdate(value, 100);
		if(value === 100){
			 enableUlti();
		}else{
				disableUlti();
		}
		//  $("#playerUlti").removeClass("enabled disabled");
		// if(canUseIt){
		// 		 $("#playerUlti").addClass("enabled");
		//  }else{
		// 		 $("#playerUlti").addClass("disabled");
		//  }
		// $("#playerUlti").css("width", value +"%");
}

function enableUlti(){
	$("#playerUlti").removeClass("disabled");
}

function disableUlti(){
	$("#playerUlti").addClass("disabled");
}

function rotate(element, degree) {
    element.css({
        '-webkit-transform': 'rotate(' + degree + 'deg)',
            '-moz-transform': 'rotate(' + degree + 'deg)',
            '-ms-transform': 'rotate(' + degree + 'deg)',
            '-o-transform': 'rotate(' + degree + 'deg)',
            'transform': 'rotate(' + degree + 'deg)',
            'zoom': 1
    });
}
var currentUlti = 10;
var ultiMax = 100;
function progressBarUpdate(x, outOf) {
    var firstHalfAngle = 180;
    var secondHalfAngle = 0;

    // caluclate the angle
    var drawAngle = x / outOf * 360;

    // calculate the angle to be displayed if each half
    if (drawAngle <= 180) {
        firstHalfAngle = drawAngle;
    } else {
        secondHalfAngle = drawAngle - 180;
    }

    // set the transition
    rotate($(".slice1"), firstHalfAngle);
    rotate($(".slice2"), secondHalfAngle);
}

// my profile
initCards();
function initCards(){
	for(let card of cards){
		let divCard = "<div class='card' data='"+ card +"'>" +
							"<div class='title'>"+ card.title +"</div>" +
							"<div class='illustration'><img src='"+ card.illustration +"'/></div>" +
							"<div class='capacity'>"+ card.capacity +"</div>" +
							"</div>";
		$("#bonusCards").append(divCard);
	}

// Gestion du drag and drop
$(".card").draggable({
		snap:".selectedCard"
	});
}

let decalage = 0;
$(".card").each(function(){
	$(this).css("left",decalage);
	decalage += 100;
});

$(".card").on("mouseover",function(){
	$(this).css("z-index","11");
});

$(".card").on("mouseout",function(){
	$(this).css("z-index","10");
});

$('.selectedCard').droppable({
	accept:'.card',
	drop : function(event, ui){
		console.log("drop");
		console.log(event);
		console.log(ui);
	}
});

var selectedCards = [];
