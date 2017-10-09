// after page loads
$(document).ready(function() {

// initialize variables
var wins = 0;
var losses = 0;
var userScore = 0;
var goalNumber;
var crystalValue;

// function to generate random number between specific range
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function to initialize game
function initGame() {

    // generate random goal number between 19 and 120
    goalNumber = randomIntFromInterval(19, 120);
    console.log(goalNumber);

    // display goal number to user
    $("#goal-number").html(goalNumber);

    // generate unique random values for amount of crystals
    var uniqueValues = [];
    while (uniqueValues.length < 4) {
        randomValue = randomIntFromInterval(1, 12);
        if (uniqueValues.indexOf(randomValue) > -1) continue;
        uniqueValues.push(randomValue);
    }
    console.log(uniqueValues);

    // assign each unique random value to a crystal
    // i know there is a more efficient way to do this, just not sure what it is
    $("#crystal-1").attr("data-crystalvalue", uniqueValues[0]);
    $("#crystal-2").attr("data-crystalvalue", uniqueValues[1]);
    $("#crystal-3").attr("data-crystalvalue", uniqueValues[2]);
    $("#crystal-4").attr("data-crystalvalue", uniqueValues[3]);

    // // assign each unique random value to a crystal
    // for (var i = 0; i < uniqueValues.length; i++) {
    //     var crystalImage = $("<img>");
    //     for (var j = 1; j <= 4; j++) {
    //         crystalImage.attr("crystal-" + j);
    //         crystalImage.attr("data-crystal-value", uniqueValues[i]);
    //     }
    //     crystalImage.addClass("crystal-img");
    // }
    // $("#crystals").append(crystalImage);

    // reset score value to 0
    userScore = 0;

}

// initialize game
initGame();

// when a crystal is clicked
$(".crystal-img").on("click", function() {

    // use the "this" keyword to specify that we should be extracting the crystal value of the clicked crystal
    crystalValue = ($(this).attr("data-crystalvalue"));

    // convert crystal value from string to integer
    crystalValue = parseInt(crystalValue);

    // add crystal's value to current score
    userScore += crystalValue;

    // if total score === goal number
    if (userScore === goalNumber) {

        // increase wins by 1
        wins++;

        // alert user
        confirm("Someone's got a knack for math!\nClick 'OK' to play again.")

        // reset game
        initGame();

    }

    // if total score > goal number
    else if (userScore > goalNumber) {

        // increase losses by 1
        losses++;

        // alert user
        confirm("It's a bust!\nClick 'OK' to try again.")

        // reset game
        initGame();

    }

    // update html display
    var statsDisplay = $("#stats");
    var scoreDisplay = $("#score-number");

    var statsHTML = 
        "<p>Wins: " + wins + "</p>" +
        "<p>Losses: " + losses + "</p>";

    statsDisplay.html(statsHTML);
    scoreDisplay.html(userScore);


}); // on click function

}); // document ready function