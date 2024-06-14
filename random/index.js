lucide.createIcons();

const randButton = document.querySelector("#button-rand");
const randDisplay = document.querySelector("#display-rand");
const randMin = document.querySelector("#min-rand");
const randMax = document.querySelector("#max-rand");
const randFloat = document.querySelector("#float-rand");
const randDecimals = document.querySelector("#decimals-rand");
const randDecimalsField = document.querySelector("#decimals-rand-field");
const copyButton = document.querySelector("#button-copy");

// reseta o checkbox quando recarrega a pagina
window.addEventListener("load", function() {
    randFloat.checked = false;
});

// generates a random float number
function generateRandNumber(min, max, decimalPlaces) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let randNumber = (Math.random() * (max - min)) + min;
    let precision = Math.pow(10, decimalPlaces);
    randNumber = Math.floor(randNumber * precision) / precision;
    
    return randNumber;
}

function assertRange(min, max) {
    min = (min < Number.MIN_SAFE_INTEGER) ?
           Number.MIN_SAFE_INTEGER :
           min;

    max = (max < Number.MAX_SAFE_INTEGER) ?
           Number.MAX_SAFE_INTEGER :
           max;
}

// enables and diasables the decimals field
randFloat.addEventListener("click", function() {
    let float = randFloat.checked;
    if (float) {
        randDecimals.disabled = false;
        randDecimalsField.classList.remove("disabled");
    }
    else {
        randDecimals.disabled = true;
        randDecimalsField.classList.add("disabled");
    }
});

function validateInput(min, max, decimals) {
    if (max < min) {
        randDisplay.style.color = "red";
        randDisplay.textContent = "invalid range";
        return false;
    }
    if (decimals < 0) {
        randDisplay.style.color = "red"
        randDisplay.textContent = "decimals cannot be negative"
        return false;
    }
    return true;
}

// genearates the random number and displays it
randButton.addEventListener("click", function() {
    randDisplay.style.color = "black";
    let min = Number(randMin.value);
    let max = Number(randMax.value);
    let decimals = Number(randDecimals.value);

    if (!validateInput(min, max, decimals)) {
        return;
    }

    assertRange(min, max);

    let randNumber = generateRandNumber(min, max, decimals);
    
    let integer = !(randFloat.checked);
    if (integer) {
        randNumber = Math.round(randNumber);
    }
    
    randDisplay.textContent = randNumber;
});

// displays the copy confirmation message
copyButton.addEventListener("click", function() {
    let text = randDisplay.textContent;
    navigator.clipboard.writeText(text);

    addCopyMessage();
    setTimeout(fadeCopyMessage, 1000);
    setTimeout(removeCopyMessage, 2000);
});

function fadeCopyMessage() {
    let copyMessage = document.querySelector(".copy-message");
    copyMessage.style.opacity = '0';
}

function addCopyMessage() {
    let docWrapper = document.querySelector(".wrapper");

    var copyMesssage = document.createElement('div');
    copyMesssage.classList.add("copy-message");
    copyMesssage.textContent = "copied to the clipboard";
    docWrapper.appendChild(copyMesssage);
}

function removeCopyMessage() {
    let copyMessage = document.querySelector(".copy-message");
    let docWrapper = document.querySelector(".wrapper");
    docWrapper.removeChild(copyMessage);
}
