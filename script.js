// THE PIG GAME

let scores, roundScore, activePlayer, diceValue;
let gamePlaying = true;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector(".dice").style.display = "none";

// EVENT LISTENERS
document.querySelector(".btn--roll").addEventListener("click", rollDice);

document.querySelector(".btn--hold").addEventListener("click", holdDice);

document.querySelector(".btn--new").addEventListener("click", function () {
    location.reload();
});

let diceDOM = document.querySelector(".dice");

function rollDice() {
    if (gamePlaying) {
        // Random Number
        let diceValue = Math.ceil(Math.random() * 6);

        // Display result
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + diceValue + ".png";

        // Update round score IF rolled number != 1
        if (diceValue !== 1) {
            // add score
            roundScore += diceValue;
            document.querySelector(
                "#current--" + activePlayer
            ).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
    }
}

function holdDice() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector("#score--" + activePlayer).textContent =
            scores[activePlayer];

        let score = scores[activePlayer];

        // check if player won the game
        if (score >= 20) {
            //won
            document.querySelector("#name--" + activePlayer).textContent =
                "Winner!";
            diceDOM.style.display = "none";
            document
                .querySelector(".player--" + activePlayer)
                .classList.add("player--winner");
            document
                .querySelector(".player--" + activePlayer)
                .classList.remove("player--active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
}

function nextPlayer() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    roundScore = 0;

    document.querySelector("#current--0").textContent = "0";
    document.querySelector("#current--1").textContent = "0";

    document.querySelector(".player--1").classList.toggle("player--active");
    document.querySelector(".player--0").classList.toggle("player--active");

    diceDOM.style.display = "none";
}
