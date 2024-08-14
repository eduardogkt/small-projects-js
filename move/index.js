let box = document.querySelector(".box");

let moveAmount = 10;
let x = 0;
let y = 0;

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
        case "w":
        case "a":
        case "s":
        case "d":
            box.textContent = "😲";
            box.style.background = "tomato"
            break;
    }
});

document.addEventListener("keyup", event => {
    switch (event.key) {
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
        case "w":
        case "a":
        case "s":
        case "d":
            box.textContent = "😀";
            box.style.background = "lightblue"
            break;
    }
});

document.addEventListener("keydown", event => {
    event.preventDefault();

    switch (event.key) {
        case "ArrowUp":
        case "w":
            y -= moveAmount;
            break;
        case "ArrowRight":
        case "d":
            x += moveAmount;
            break;
        case "ArrowLeft":
        case "a":
            x -= moveAmount;
            break;
        case "ArrowDown":
        case "s":
            y += moveAmount;
            break;
    }
    box.style.top = `${y}px`
    box.style.left = `${x}px`
});