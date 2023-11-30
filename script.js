'use strict';

//selecting elements

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

let currentScore;
let scores;
let activePlayer;
let playing;
// starting conditions

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  current0EL.textContent = 0;
  current1EL.textContent = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    //   console.log(dice);
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player

      // scores[activePlayer] += currentScore;
      // console.log(activePlayer, scores[activePlayer]);

      // document.getElementById(`score--${activePlayer}`).textContent =
      //   scores[activePlayer];
      // if (player0EL.classList.contains('player--active')) {
      //   player0EL.classList.remove('player--active');
      // } else if (!player0EL.classList.contains('player--active')) {
      //   player0EL.classList.add('player--active');
      // }

      // if (player1EL.classList.contains('player--active')) {
      //   player1EL.classList.remove('player--active');
      // } else if (!player1EL.classList.contains('player--active')) {
      //   player1EL.classList.add('player--active');
      // }
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      diceEL.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();
});
