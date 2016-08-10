//GLOBAL VARIABLES
//-------------------------------------------------------------

// Arrays and variables for holding data
// words to use for the game
var wordOptions = ["catwoman", "mystique", "batgirl", "rouge"];
// this will hold the selected word
var selectedWord = "";
//determine what letters are in the word
var lettersinWord= [];
//calculate the number of blanks
var numBlanks = 0;
//create an array to hold both the blanks and correct guesses
var blanksAndSuccesses = [];
//array for wrong guesses
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;



// FUNCTIONS
//-------------------------------------------------------------

// start game function
function startGame () {
      //select a word randomly from the array of options
      selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
      // break the selected word into parts
      lettersinWord = selectedWord.split("");
      //get number of blanks
      numBlanks = lettersinWord.length;

      //reset the guesses left on each round
      guessesLeft = 9;
      wrongLetters = [];
      blanksAndSuccesses = [];

      // populate blanks and successes with right number of blanks
      for (var i=0; i<numBlanks; i++) {
        blanksAndSuccesses.push("_");
      }

      // change html to reflect game round conditions using jquery
      $("#wordToGuess").html(blanksAndSuccesses.join(" "));
      $("#numGuesses").html(guessesLeft);
      $("#winCounter").html(winCount);
      $("#lossCounter").html(lossCount);

      // logging
      console.log(selectedWord);
      console.log(lettersinWord);
      console.log(numBlanks);
      console.log(blanksAndSuccesses);

}

// need a function to compare the letter guessed to the letters in the wordToGuess
// this function expects the argument of letter
function checkLetters(letter) {
    // first check if the letter exists anywhere in the word
    var isLetterInWord = false;

    // use a for loop to check if it matches
    for (var i=0; i<numBlanks; i++) {
      // if else for letter in word
      if(selectedWord[i] == letter) {
        isLetterInWord = true;
      }
    }

    //check where in the word the letter is
    //then populate the blanksAndSuccesses array

    if(isLetterInWord) {
        for(var i=0; i<numBlanks; i++) {
          // if an individual [i] in selected word is equal to letter
          if(selectedWord[i] == letter){
            // set blanksAndSuccesses i to letter
            blanksAndSuccesses[i] = letter;
            }
        }
    }
    // so if you didn't find the letter in the word
    else {
      wrongLetters.push(letter);
      guessesLeft--
      // testing
    }
    console.log(blanksAndSuccesses)
}

//end of each round function
function roundComplete() {
  console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

  // update the html to reflect the most recent information
  $("#guessesLeft").html(numGuesses);
  $("#wordToGuess").html(blanksAndSuccesses.join(" "));
  $("#wrongGuesses").html(wrongLetters.join(" "));

  // check if user won
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You won!");
    //update the win counter in the html
    $("#winCounter").html(winCount);
  }

  // check if user lost
  else if (guessesLeft == 0){
    lossCount++;
    alert("You lost!");

    //update the html
    $("#lossCounter").html(lossCount);
    startGame();
  }

}


// MAIN PROCESSES
//-------------------------------------------------------------
// initiates the code for the first time
startGame();

// register keyclicks
document.onkeyup = function(event) {
      var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
      checkLetters(letterGuessed);
      roundComplete();
  console.log(letterGuessed);
}
