// after page loads
$(document).ready(function() {

// initialize variables
var wins = 0;
var losses = 0;
var userScore = 0;
var goalNumber;
var crystalValue;

// variables for random alerts win user wins/loses
var dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()];

var winAlertOptions = ["Whoa, mathe-radical!", "High five, someone's got the math gene!", "I envy your knack for math.", "Are you a descendant of Archimedes? 'Cause you're algebraic!", "Sweet, can you teach me how to math?"];

var loseAlertOptions = ["It's a bust!", "Oof, so close!", "Argh, missed it by that much!", "It's okay, " + dayOfWeek + "'s weren't made for mathing."];

// function to generate random alert message when user wins
function randomWinAlert() {
    return winAlertOptions[Math.floor(Math.random() * winAlertOptions.length)];
}

// function to generate random alert message when user loses
function randomLoseAlert() {
    return loseAlertOptions[Math.floor(Math.random() * loseAlertOptions.length)];
}

// function to generate random number between specific range
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function to play sound when crystal is clicked
function playCrystalSound() {
    var crystalSound = $("#crystal-sound")[0];
    crystalSound.load();
    crystalSound.cloneNode();
    crystalSound.play();
}

// function to play sound when user wins a game
function playWinSound() {
    var winSound = $("#level-up")[0];
    winSound.load();
    winSound.cloneNode();
    winSound.play();
}

// function to play sound when user loses
function playLoseSound() {
    var loseSound = $("#lose-sound")[0];
    loseSound.load();
    loseSound.cloneNode();
    loseSound.play();
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
    // I know there is a more efficient way to do this, just not sure what it is
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

    // play audio
    playCrystalSound();

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

            // make div blink on first win and every 5 wins to motivate user!
            if ((wins !== 0) && (wins === 1 || wins % 5 === 0)) {
                $("#win-loss-div").addClass("flash");
                $("#motivation").show().delay(3250).fadeOut();
            }

            else if ($("#win-loss-div").hasClass("flash") && (wins % 5 !== 0)) {
                $("#win-loss-div").removeClass("flash");
            }

        // play sound
        playWinSound();

        // alert user
        confirm(randomWinAlert() + "\nClick 'OK' to play again.")

        // reset game
        initGame();

    }

    // if total score > goal number
    else if (userScore > goalNumber) {

        // increase losses by 1
        losses++;

        // play sound
        playLoseSound();

        // alert user
        confirm(randomLoseAlert() + "\nClick 'OK' to try again.")

        // reset game
        initGame();

    }

    // update html display
    var winLossDisplay = $("#win-loss-div");
    var totalDisplay = $("#total-number");

    var winLossHTML = "<p>Wins: " + wins + "<br />Losses: " + losses + "</p>";

    winLossDisplay.html(winLossHTML);
    totalDisplay.html(userScore);


}); // on click function

}); // document ready function