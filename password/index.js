const includeLowercase = document.querySelector("#check-lowercase");
const includeUppercase = document.querySelector("#check-uppercase");
const includeNumbers = document.querySelector("#check-numbers");
const includeSymbols = document.querySelector("#check-symbols");

const pwDisplay = document.querySelector("#display-rand");

const randButton = document.querySelector("#button-rand");
const copyButton = document.querySelector("#button-copy");

// reseta o checkbox quando recarrega a pagina
window.addEventListener("load", function() {
    includeLowercase.checked = true;
});

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function validateInput(passwordLength, allowedCharsLength) {
    if (passwordLength <= 0) {
        pwDisplay.style.color = "red"
        pwDisplay.textContent = "password length needs to be at least 1 character long"
        return false;
    }
    if (allowedCharsLength === 0) {
        pwDisplay.style.color = "red"
        pwDisplay.textContent = "at least one option needs to be selected"
        return false;
    }
    return true;
}

function generatePassword() {
    pwDisplay.style.color = "black";
    const passwordLength = document.querySelector("#input-length").value;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbolChars = "!@#$%&*()[]{}-_=+\/|,.;<>:?^~§";
    const numberChars = "0123456789";
    let allowedChars = "";
    let password = [];

    allowedChars += (includeLowercase.checked) ? lowercaseChars : "";
    allowedChars += (includeUppercase.checked) ? uppercaseChars : "";
    allowedChars += (includeNumbers.checked) ? numberChars : "";
    allowedChars += (includeSymbols.checked) ? symbolChars : "";

    if (!validateInput(passwordLength, allowedChars.length)) {
        return;
    }

    for (let i = 0; i < passwordLength; i++) {        
        password[i] = allowedChars[randRange(0, allowedChars.length)]
    }

    pwDisplay.textContent = password.join("");
}

function displayCopyMessage() {
    let text = pwDisplay.textContent;
    navigator.clipboard.writeText(text);

    addCopyMessage();
    setTimeout(fadeCopyMessage, 1000);
    setTimeout(removeCopyMessage, 2000);
}

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


randButton.addEventListener("click", generatePassword);

copyButton.addEventListener("click", displayCopyMessage);