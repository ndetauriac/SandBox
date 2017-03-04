
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
		 $("#playerHealth").removeClass("normal medium low");
		 if(value < 20){
				 $("#playerHealth").addClass("low");
		 }else if(value < 40){
				 $("#playerHealth").addClass("medium");
		 }else{
				 $("#playerHealth").addClass("normal");
		 }
		 $("#playerHealth").css("width", value +"%");
}

function setPlayerUlti(value, canUseIt){
		 $("#playerUlti").removeClass("enabled disabled");
		if(canUseIt){
				 $("#playerUlti").addClass("enabled");
		 }else{
				 $("#playerUlti").addClass("disabled");
		 }
		$("#playerUlti").css("width", value +"%");
}

// my profile

$( function() {
    $(".card").draggable();
	});
