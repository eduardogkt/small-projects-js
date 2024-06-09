const inputField = document.querySelector("#temp-input");
const outputField = document.querySelector("#temp-output");

const inputSelect = document.querySelector("#input-select");
const outputSelect = document.querySelector("#output-select");

const convetBtn = document.querySelector("#convert-button");
const swapBtn = document.querySelector("#swap-button");

function CtoF(C) {
    return C * 1.8 + 32;
}

function CtoK(C) {
    return C + 273.15;
}

function FtoC(F) {
    return (F - 32) / 1.8;
}

function FtoK(F) {
    return (F - 32) / 1.8 + 273.15;
}

function KtoC(K) {
    return K - 273.15;
}

function KtoF(K) {
    return (K - 273.15) * 1.8 + 32;
}

function fixedDecimals(num, decimalsPlaces) {
    let precision = Math.pow(10, decimalsPlaces);
    return Math.trunc(num * precision) / precision; 
}

function conversionParams(input, output) {
    return `${input.value}-${output.value}`;
}

convetBtn.addEventListener("click", function() {
    let outputTemp;
    let inputTemp = Number(inputField.value);
    
    if (isNaN(inputTemp) || inputField.value === "") {
        outputField.value = "";
        return;
    }

    switch (conversionParams(inputSelect, outputSelect)) {
        case "celsius-fahrenheit": outputTemp = CtoF(inputTemp); break;
        case "celsius-kelvin":     outputTemp = CtoK(inputTemp); break;
        case "fahrenheit-celsius": outputTemp = FtoC(inputTemp); break;
        case "fahrenheit-kelvin":  outputTemp = FtoK(inputTemp); break;
        case "kelvin-celsius":     outputTemp = KtoC(inputTemp); break;
        case "kelvin-fahrenheit":  outputTemp = KtoF(inputTemp); break;    
        default: outputTemp = inputTemp; break;
    }

    outputTemp = fixedDecimals(outputTemp, 4);
    outputField.value = (isNaN(outputTemp)) ? "" : outputTemp;
});

// swap the conversion
swapBtn.addEventListener("click", function() {
    let input = inputSelect.value;
    let output = outputSelect.value;

    inputSelect.value = output;
    outputSelect.value = input;

    let inputTemp = inputField.value;
    let outputTemp = outputField.value;

    inputField.value = outputTemp;
    outputField.value = inputTemp;
});