/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, winScore;
var gamePlaying = true;
var lastDice;


chooseWinningScore();
newGame();



document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        //1. random number
        var dice = Math.floor(Math.random() * 6) + 1 //math.random () gives number 0 to 1       2 defining random dice
        //math.floor () removes decimals

        //2. display result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png'; //number od dice = number of png file

        //3. Update the round score if the rolled number was not a 1
        if (dice === 6 && lastDice === 6) {

            //double six = lose score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
            
        } else if (dice !== 1) {

            //add score
            roundScore += dice; // roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // 0 - first player 1 - second player
        } else {

            //next player
            nextPlayer();
        }
        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {

        // add current score to global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // chceck if player won the game
        if (scores[activePlayer] >= winScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //if else staytment
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'; //1 step reseting all scores
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function chooseWinningScore() {
    var twoHundred = document.getElementById('btn-twoHundred');
    var oneHundred = document.getElementById('btn-oneHundred');
    var fifty = document.getElementById('btn-fifty');
    var twenty = document.getElementById('btn-twenty');

    if (gamePlaying === true) {
        twoHundred.addEventListener('click', function () {
            winScore = 200;
            twoHundred.classList.toggle('btn-selected');
            oneHundred.classList.remove('btn-selected');
            fifty.classList.remove('btn-selected');
            twenty.classList.remove('btn-selected');
        });
        oneHundred.addEventListener('click', function () {
            winScore = 100;
            oneHundred.classList.toggle('btn-selected');
            twoHundred.classList.remove('btn-selected');
            fifty.classList.remove('btn-selected');
            twenty.classList.remove('btn-selected');
        });
        fifty.addEventListener('click', function () {
            winScore = 50;
            fifty.classList.toggle('btn-selected');
            oneHundred.classList.remove('btn-selected');
            twoHundred.classList.remove('btn-selected');
            twenty.classList.remove('btn-selected');
        });
        twenty.addEventListener('click', function () {
            winScore = 20;
            twenty.classList.toggle('btn-selected');
            oneHundred.classList.remove('btn-selected');
            fifty.classList.remove('btn-selected');
            twoHundred.classList.remove('btn-selected');
        });

    }
}