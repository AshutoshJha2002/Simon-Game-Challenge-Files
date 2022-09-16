var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var Level=0;
function nextSequence()
{
  userClickedPattern=[];
  Level++;
  $("#level-title").text("Level "+Level);
  var randomNumber=Math.random();
randomNumber=randomNumber*4;
randomNumber=Math.floor(randomNumber);
var randomChosenColour=randomNumber;
gamePattern.push(buttonColours[randomChosenColour]);
$("."+buttonColours[randomChosenColour]).fadeOut(100).fadeIn(100);
var audio = new Audio("sounds/" + buttonColours[randomChosenColour] + ".mp3");
audio.play();
}
var started=false;
$(document).keypress(function() {
if(!started){
    nextSequence();
    started=true;
}
});
$(".btn").click(function(event){
  handler(event.target.id);
  animatePress(event.target.id);
winner(userClickedPattern.length-1);
})
function handler(key){
var userChosenColor=key;
userClickedPattern.push(userChosenColor);
playSound(key);
}
function playSound(currentKey){
  var a = new Audio("sounds/" + currentKey + ".mp3");
  a.play();
}
function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
      $("."+currentColour).removeClass("pressed");
  },100)
}
function winner(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }
  else{
    gameOver();
  }
}
function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
       $("body").removeClass("game-over");
  },200)
  $("#level-title").text("Game Over,Press Any Key to Restart");
  startOver();
}
function startOver(){
  Level=0;
  gamePattern=[];
  started=false;
}
