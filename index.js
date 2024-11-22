
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level1=0;

//a function for creating next sequence and its called this function when a user does a keypress.
function nextSequence(){

    //updating the game score
    level1++;

    $("h1").text("Level " +level1);

//generates a rondom number
    var randomNumber= Math.floor(Math.random()*4);

    var randomChosenColour= buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    //it gives flashy animated on the random chosen colour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

//excuting playsound function
    playSound(randomChosenColour);

   

    

}


$(".btn").click(function handler(){

    var userChosenColour=$(this).attr('id');
    
   
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastAnswer=userClickedPattern[userClickedPattern.length -1];
    checkAnswer(lastAnswer);
})


function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

//adding a "pressed" class whic gives a flashy style
function animatePress(currentColor){
    $("."+currentColor).addClass('pressed');
    setTimeout(function(){
        $("."+currentColor).removeClass('pressed');
       
}, 100);
}

//it detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).one('keypress',function(){
    
    nextSequence();
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".

  
});


function checkAnswer(currentLevel){

    if(currentLevel===gamePattern[gamePattern.length -1]){
        setTimeout(function() {
            nextSequence();
        }, 1000)
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        restart()
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass('game-over');
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 200)
    }

}


function restart(){
    level1=0;
    $(document).one('keypress',function(){
    
        nextSequence();
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("h1").text("Level " +level1);
    
      
    });
}





