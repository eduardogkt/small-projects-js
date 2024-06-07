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

function generateRandNumber(min, max, decimalPlaces) {
    let negativeFactor = 1;
    
    if (min < 0) {
        min = 0;
        // decides if the random number is negative 50/50 chance
        negativeFactor = (Math.round(Math.random() * 2) % 2 == 0) ? -1 : 1;
    }

    let randNumber = (Math.random() * (max - min)) + min;
    let precision = Math.pow(10, decimalPlaces);
    randNumber = Math.floor(randNumber * precision) / precision;
    
    return randNumber * negativeFactor;
}

function assertRange(min, max) {
    min = (min < Number.MIN_SAFE_INTEGER) ?
           Number.MIN_SAFE_INTEGER :
           min;

    max = (max < Number.MAX_SAFE_INTEGER) ?
           Number.MAX_SAFE_INTEGER :
           max;
}

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

randButton.addEventListener("click", function() {
    randDisplay.style.color = "black";
    let min = randMin.value;
    let max = randMax.value;

    if (max < min) {
        randDisplay.textContent = "invalid range";
        randDisplay.style.color = "red";
        return;
    }
    assertRange(min, max);

    let decimals = randDecimals.value;
    let randNumber = generateRandNumber(min, max, decimals);
    
    let integer = !(randFloat.checked);
    if (integer) {
        randNumber = Math.round(randNumber);
    }
    
    randDisplay.textContent = randNumber;
});

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
