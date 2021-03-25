'use strict';

// selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score0Element = document.querySelector('#score--0');
let score1Element = document.getElementById('score--1'); // works the same as line above
let current0Element = document.getElementById('current--0');
let current1Element = document.getElementById('current--1');

// declaring variables to be calles in the newGame function
let bigScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// starting conditions that uses the values declared above
const newGame = function () {
  // theres a cleaner code for this part in teachers file, but I did this on my own so I wanted to keep it :)
  bigScores = [0, 0];
  playing = true;
  activePlayer = 0;
  diceElement.classList.add('hidden'); // this hidden class was created in the style.css file
  currentScore = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

newGame();

// creating a function that switches players, changes the active background and resets the current score
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // sets the score from the active player back to 0
  activePlayer = activePlayer === 0 ? 1 : 0; // activePlayer receives activePlayer1 if it's currently 0 and vice versa
  currentScore = 0;
  // if (activePlayer === 0) {
  //   // the lines below adds and removes the player--active class depending on who is the activePlayer
  //   player0Element.classList.add('player--active');
  //   player1Element.classList.remove('player--active');
  // } else {
  //   player0Element.classList.remove('player--active');
  //   player1Element.classList.add('player--active');
  // }

  // the line below does the same as the if else above, the .toggle checks if the class is there, if it is, it removes. If the class is not in the element, it adds it.
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// roling the dice functionallity
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`; // adds the dice variable and use it to map to an image and use it as source

    // 3. Check for a 1
    if (dice !== 1) {
      // If false, add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // If true, move on to next player
      switchPlayer(); // calling the function
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score
    bigScores[activePlayer] = bigScores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      bigScores[activePlayer];

    // 2. Check if total score is >= 15
    // If true: Finish the game
    if (bigScores[activePlayer] >= 15) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // else: Switch player
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);
