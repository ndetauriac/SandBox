
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

// UI
function setPlayerHealth(value){
		 let displayedHealth = value / PLAYER_HEALTH_MAX * 100;
		 $("#playerHealth").removeClass("normal medium low");
		 if(displayedHealth < 20){
				 $("#playerHealth").addClass("low");
		 }else if(displayedHealth < 40){
				 $("#playerHealth").addClass("medium");
		 }else{
				 $("#playerHealth").addClass("normal");
		 }
		 $("#playerHealth").css("width", displayedHealth +"%");

		 // TODO : link setPlayerUlti to real ulti
		 setPlayerUlti(displayedHealth);
}

function setPlayerUlti(value){
		//TODO : set real ulti value
		let displayedUlti = 100 - value;
		$("#playerUlti").css("width", displayedUlti +"%");
}

// my profile

$( function() {
    $(".card").draggable();
	});
