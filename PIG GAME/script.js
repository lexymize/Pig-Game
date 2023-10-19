'use strict';
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentScore, activePlayer, playing, newScore;

const init = function () {
  playing = true;
  newScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  diceEl.classList.add('hidden');
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore;
};
init();
//rolling the dice
btnRoll.addEventListener('click', function () {
  // 1.generating random number
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice roll
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switching to next player
      switchPlayer();
    }
  }
});
const hold = function () {
  if (playing)
    //adding current score to new score
    newScore[activePlayer] += currentScore;
  //displaying total score
  document.getElementById(`score--${activePlayer}`).textContent =
    newScore[activePlayer];
  if (newScore[activePlayer] >= 20) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
};
btnhold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
