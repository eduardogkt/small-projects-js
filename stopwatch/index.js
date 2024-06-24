lucide.createIcons();

const swDisplay = document.querySelector("#stopwatch-display");
const swStart = document.querySelector("#button-start");
const swStop = document.querySelector("#button-stop");
const swReset = document.querySelector("#button-reset");

let timer = null;
let startTime = 0;
let elapseTime = 0;
let running = false;

swStart.addEventListener("click", function() {
    if (!running) {
        startTime = Date.now() - elapseTime;
        timer = setInterval(updateDisplay, 10);
        running = true;
    }
});

swStop.addEventListener("click", function() {
    if (running) {
        elapseTime = Date.now() - startTime;
        clearInterval(timer);
        running = false;
    }
});

swReset.addEventListener("click", function() {
    clearInterval(timer);
    startTime = 0;
    elapseTime = 0;
    running = false;
    swDisplay.textContent = "00:00:00:00"
});

function updateDisplay() {
    elapseTime = Date.now() - startTime;

    let hours = Math.floor(elapseTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapseTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapseTime / (1000) % 60);
    let miliseconds = Math.floor(elapseTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}:${miliseconds}`;

    swDisplay.textContent = timeString;
}