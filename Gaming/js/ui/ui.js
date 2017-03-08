
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
		if(canUseIt){
			 enableUlti();
		}else{
				disableUlti();
		}
}

function enableUlti(){
	$("#playerUlti").removeClass("disabled");
	$("#playerUlti").addClass("enadble");
}

function disableUlti(){
	$("#playerUlti").removeClass("enabled");
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
// Set horizontal scroll for cards
$(function() {
   $("#bonusCards").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
   });
});

// init cards
initCards();
function initCards(){
	for(let card of cards){
		let divCard = "<div id='card-"+ card.id +"' class='card "+ card.level +"' draggable='true' data='"+ card +"'>" +
							"<div id='title-"+ card.id +"' class='title' draggable='false'>"+ card.title +"</div>" +
							"<div id='illustration-"+ card.id +"' class='illustration' draggable='false'><img id='img-"+ card.id +"' src='"+ card.picture +"' draggable='false'/></div>" +
							"<div id='text-"+ card.id +"' class='text' draggable='false'>"+ card.capacity +"</div>" +
							"<div id='level-"+ card.id +"' class='level' draggable='false'>"+ card.level +"</div>" +
							"</div>";
		$("#bonusCards").append(divCard);
	}
}

// Drag and Drop
var selectedBonus = {};
var cardState = {};
var draggingCard;
function handleDragStart(e) {
	draggingCard = e.target.id;
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  [].forEach.call(cardAreas, function (cardArea) {
    cardArea.classList.remove('over');
  });
}

function handleDrop(e) {
	// Je bloque l'evenement natif du navigateur
  if (e.stopPropagation) {
    e.stopPropagation();
  }

	// Je récupère l'id de la div sur laquelle je drop
	let droppedDiv = e.target.id;
	// S'il s'agit d'une carte, je vais chercher l'area la plus proche
	// TODO : BUG RARE ET INCOMPREHENSIBLE, UNE CARTE SE MET EN DESSOUS DE L'AUTRE.. FUUUUCK IT !!! ><
	if(!droppedDiv.startsWith("cardArea")) droppedDiv = $("#"+ e.target.id).closest('div[class="cardArea"]')[0].id;
	// Je vérifie si une carte est déjà posée sur cette area
	var currentValueForArea = selectedBonus[droppedDiv];

	// Avant de continuer le traitement, pour éviter qu'il y ai deux fois le même bonus, je supprime des bonus la carte dragging
	if(cardState[draggingCard] != null){
		delete selectedBonus[cardState[draggingCard]];
		cardState[draggingCard] = null;
	}

	if(currentValueForArea == null){
		// Si ce n'est pas le cas, j'ajoute le bonus
		selectedBonus[droppedDiv] = draggingCard;
		// Je set le tableau de status des cartes
		cardState[draggingCard] = droppedDiv;
		// Et je fais le déplacement de carte
		$("#"+ draggingCard).appendTo("#"+ droppedDiv);
	}else{
		// Sinon, j'ajoute la carte déjà présente aux autres cartes bonus
		$("#"+ currentValueForArea).appendTo("#bonusCards");
		// Je set le nouveau bonus
		selectedBonus[droppedDiv] = draggingCard;
		// Je set le statut de la carte
		cardState[draggingCard] = droppedDiv;
		// Et je finis par déplacer la carte
		$("#"+ draggingCard).appendTo("#"+ droppedDiv);
	}

console.log(selectedBonus);

  return false;
}

var cards = document.querySelectorAll('.card');
[].forEach.call(cards, function(card) {
  card.addEventListener('dragstart', handleDragStart, false);
});

var cardAreas = document.querySelectorAll('.cardArea');
[].forEach.call(cardAreas, function(cardArea) {
  cardArea.addEventListener('dragenter', handleDragEnter, false);
  cardArea.addEventListener('dragover', handleDragOver, false);
  cardArea.addEventListener('dragleave', handleDragLeave, false);
  cardArea.addEventListener('dragend', handleDragEnd, false);
  cardArea.addEventListener('drop', handleDrop, false);
});

$('img').on('dragstart', function(event) { event.preventDefault(); });
