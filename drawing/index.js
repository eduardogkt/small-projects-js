lucide.createIcons();

const eraser = document.querySelector("#eraser");
const stroke = document.querySelector("#stroke");
const colors = document.querySelectorAll(".color");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const strokeSizes = [2, 3, 5, 10, 15, 20];
const strokeIcon = stroke.firstElementChild;

let mouseDown = false;
let strokeSize = 0;
let selectedColor = "black";
let canvaColor = "white";

// inicializa canvas
document.addEventListener("DOMContentLoaded", () => {
    context.fillStyle = canvaColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
});

// linha
stroke.addEventListener("click", () => {
    strokeSize = (strokeSize + 1) % strokeSizes.length;
    strokeIcon.style.width = `${strokeSizes[strokeSize] * 2}px`;
});

// borracha
eraser.addEventListener("click", () => {
    selectedColor = canvaColor;
});

// trocar cores
colors.forEach(color => {
    color.addEventListener("click", () => {
        selectedColor = `${color.id}`;
        strokeIcon.style.fill = selectedColor;
        if (selectedColor === "whitesmoke") {
            strokeIcon.style.stroke = "black";
        }
        else {
            strokeIcon.style.stroke = selectedColor;
        }
    });
});

document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);

canvas.addEventListener('mousemove', (event) => {
    if (mouseDown) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        changePixels(mouseX, mouseY);
    }

    function changePixels(x, y) {
        context.beginPath();
        context.arc(x, y, strokeSizes[strokeSize], 0, 2 * Math.PI, false);
        context.fillStyle = selectedColor;
        context.fill();
    }
});

