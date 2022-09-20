// Global Variables

var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
started = false;


// Event to identify key pressed on the keyboard to initate the game

$(document).on("keypress", function() {
  if(!started){
  $("h1").text("Level 0");
  nextSequence();
  started = true;
}
});

// Function to randomly choose next color in sequence

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).on("click", function(){
   playSound(randomChosenColour);
   animatePress(randomChosenColour);
});

}

// On click event to start the game and continue to the next levels

$(".btn").on("click",function(){

 var userChosenColour = $(this).attr("id");
 userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);
 animatePress(userChosenColour);

 console.log(userClickedPattern);

 checkAnswers((userClickedPattern.length - 1));
});

// Function to play sounds when the buttons are clicked

function playSound(name) {
  var audio = new Audio('sounds/'+name+'.mp3'); // Play color sounds
  audio.play();
}

function wrongAnswer() {
  var audio = new Audio('sounds/wrong.mp3'); // Play sound for the wrong answer
  audio.play();
}

// Function to animate the buttons when clicked

function animatePress(currentColor) {
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function(){
  $("#"+ currentColor).removeClass("pressed");
  },100);
}

function animatePage() {
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");
},200);
}






// Function to check if the answer is correct

function checkAnswers(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 2000);

    level++;
    $("h1").text("Level "+ level);
  }
} else {

    wrongAnswer();
    animatePage();
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
