btns = document.querySelectorAll(".button");
userChoice = document.querySelector("#user-choice");
computerChoice = document.querySelector("#computer-choice");
result = document.querySelector("#result");

function getResult(computerPick, userPick) {
    if (computerPick === userPick) {
        return "Tie! 🥴";
    }
    else if (computerPick === "✂️" && userPick === "🪨" ||
             computerPick === "📃" && userPick === "✂️" ||
             computerPick === "🪨" && userPick === "📃") {
        return "You won! 😀";
    }
    else if (computerPick === "🪨" && userPick === "✂️" ||
             computerPick === "✂️" && userPick === "📃" ||
             computerPick === "📃" && userPick === "🪨" ) {
        return "You lost! 😵";
    }
}

btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        let userPick = btn.textContent;

        let rand = Math.round(Math.random() * 100);
        let computerPick = btns[rand % 3].textContent;

        result.textContent = getResult(computerPick, userPick);

        computerChoice.textContent = computerPick;
        userChoice.textContent = userPick;
    });
});