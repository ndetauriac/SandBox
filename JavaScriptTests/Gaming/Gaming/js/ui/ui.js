
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
	console.log("test");
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
