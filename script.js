'use strict';

/* document.querySelector('.between').textContent = '(Between 1 and 25)';
document.querySelector('.between').textContent = '(Between 1 and 20)';
document.querySelector('.guess').value = 22;
 */

/* TODO
// Initialise one random number 'secretNumber' between 1-20 -g
// Create clickHandler() to compute whether right guess was made, handle
// all exceptions and base cases
// Create displayMessage() to change .message class

// TODO
// Called every time "Check!" button on webpage is clicked
// Gets the value from input box
// Checks to see if number is empty
// Checks to see if number is lower than 'secretNumber'
// Checks to see if number is higher than 'secretNumber'
// Manipulate score - can add call to separate functions
// Maintain variables in JS file to keep track of score and highscore
// Keep highscore throughout various webpage reloads
*/

// This is the guessed number - input from player
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// This variable stores bounds specified on webpage for game.
// First character from str truncated for being passed as displayMessage() argument
const guessBound = document.querySelector('.between').textContent.substring(1);
let score = Number(document.querySelector('.score').textContent);
let highScore = Number(document.querySelector('.highscore').textContent);
const guesses = [];

// This is only for debugging purposes, displays the random number.
// document.querySelector('.number').textContent = secretNumber;

// Changes HTML message class text content
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Adds guessed number to guesses class
function addGuess(x) {
  document.querySelector('.array').textContent += `${x}|`;
}

// Event Listener - OnClick -> Check Button
document
  .querySelector('.check')
  .addEventListener('click', function clickHandler() {
    console.log(document.querySelector('.guess').value);
    const guess = Number(document.querySelector('.guess').value);
    // If there is no input and check is clicked
    if (!guess) {
      displayMessage('No number input ⛔️');
      console.log(guess);
    }
    // If the guess is outside of specified bounds
    // score is unchanged for this case
    else if (guess > 20 || guess < 1) {
      displayMessage(`(Guess not ${guessBound} ⚠️`);
    }
    // If the right number is guessed
    else if (guess === secretNumber) {
      displayMessage(`You've guessed my number!`);
      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }
      document.querySelector('body').style.backgroundColor = '#50D02B';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.number').style.width = '250px';
      document.querySelector('.number').style.color = '#50D02B';
      document.querySelector('.check').disabled = true;
    } else if (guesses.includes(guess)) {
      displayMessage(`You've already guessed ${guess}!`);
    }
    // If wrong number is guessed
    // This case should handle case when player is out of tries, i.e. score===0
    else {
      score--;
      if (score > 0) {
        guesses.push(guess);
        switch (secretNumber - guess) {
          case -2:
          case -1:
            displayMessage(`You're close! Guess a little higher.`);
            break;
          case 1:
          case 2:
            displayMessage(`You're close! Guess a little higher.`);
            break;
          default:
            displayMessage(
              `${guess > secretNumber ? 'Too High!' : 'Too Low'} Try again!`
            );
        }
        addGuess(guess);
        document.querySelector('.score').textContent = score;
      } else {
        displayMessage(`You've run out of tries! 🫥`);
        document.querySelector('.score').textContent = score;
        document.querySelector('.check').textContent = 'Out of tries!';
        document.querySelector('.check').disabled = true;

        document.querySelector('.check').style.backgroundColor = '#808280';
      }
    }
  });

// TODO: Again button functionality

function emptyGuesses() {
  while (guesses.length > 0) {
    guesses.pop();
  }
}

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  score = 10;
  document.querySelector('.score').textContent = 10;
  document.querySelector('body').style.color = '#eeeeee';
  document.querySelector('body').style.backgroundColor = '#222222';
  document.querySelector('.number').style.color = '#222222';
  displayMessage('Start guessing...');
  document.querySelector('.check').disabled = false;
  emptyGuesses();
  document.querySelector('.array').textContent = `Your previous guesses: `;
});
