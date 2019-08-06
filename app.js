/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, dice;

function initFunction() {
scores = [0,0];
roundScore = 0;
activePlayer = 0;

gamePlaying = true;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'player 1';
document.getElementById('name-1').textContent = 'player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

initFunction();

//setter - textContent pouze .js, innerHTML .js + html
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


//getter
// var x = document.querySelector('#score-0').textContent;


document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying) {

    //1. random number
    var dice = Math.floor(Math.random() * 6 + 1);

    //2. display  the result
    document.getElementById('dice').style.display = 'block';
    document.getElementById('dice').src = 'dice-' + dice + '.png';

    //3. update the round
    if (dice === 6 && lastDice === 6) {
        //player losses score
        scores[activePlayer] = 0;
        document.querySelector('#current-' + activePlayer).textContent = '0';
        nextPlayer();

    }
    else if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
      }
      lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
  // Add current score to global score
  scores[activePlayer] += roundScore;
};

  // Update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  var input = document.querySelector('.final-score').value;
  var winningScore;
 
  if (input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }

  // Check if player won the game
    player = activePlayer + 1;
    
  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    nextPlayer();
  }
});

function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initFunction);
