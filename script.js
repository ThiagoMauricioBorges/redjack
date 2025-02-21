'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score0El = document.querySelector('#score--0');   
const score1El = document.getElementById ('score--1');  
const current0El = document.getElementById('current--0'); 
const current1El = document.getElementById('current--1'); 

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// //  starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// let scores = [0,0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

let scores, currentScore, activePlayer, playing;

const init = function() {
  //  starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0,0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll dice functionality 
btnRoll.addEventListener('click', function() {
  if (playing) {
    // 1. generating random dice roll
    const dice = Math.trunc(Math.random() *6) + 1;
    // console.log(dice);  // only to test if the number are generated correctly

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
      // switch to next player
      switchPlayer();
    }
  }
});


btnHold.addEventListener('click', function(){
  if(playing) {
    //  1. add current score to active player's score
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    diceEl.classList.add('hidden');

    // 2. check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden')
    } else {
      // switch to the next player
      switchPlayer();
    }
  }

});
btnNew.addEventListener('click', init);




// modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for(let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

  
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
};
  
document.addEventListener('keydown', function(e) {

  if(e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});