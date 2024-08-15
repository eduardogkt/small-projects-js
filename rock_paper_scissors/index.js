const btns = document.querySelectorAll(".button");
const userChoice = document.querySelector("#user-choice");
const computerChoice = document.querySelector("#computer-choice");
const result = document.querySelector("#result");
const userScoreDisplay = document.querySelector("#user-score");
const computerScoreDisplay = document.querySelector("#computer-score");

let userScore = 0;
let computerScore = 0;

function getResult(computerPick, userPick) {
    if (computerPick === userPick) {
        result.style.color = "black";
        return "Tie! 🥴";
    }
    else if (computerPick === "✂️" && userPick === "🪨" ||
             computerPick === "📃" && userPick === "✂️" ||
             computerPick === "🪨" && userPick === "📃") {
        result.style.color = "green";
        userScore++;
        return "You won! 😀";
    }
    else if (computerPick === "🪨" && userPick === "✂️" ||
             computerPick === "✂️" && userPick === "📃" ||
             computerPick === "📃" && userPick === "🪨" ) {
        result.style.color = "red";
        computerScore++;
        return "You lost! 😵";
    }
}

btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        let userPick = btn.textContent;
        let computerPick = btns[Math.floor(Math.random() * 3)].textContent;

        result.textContent = getResult(computerPick, userPick);

        computerChoice.textContent = computerPick;
        computerScoreDisplay.textContent = `${computerScore}`;

        userChoice.textContent = userPick;
        userScoreDisplay.textContent = `${userScore}`;
    });
});