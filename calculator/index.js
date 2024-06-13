lucide.createIcons();
const btnDisplayable = document.querySelectorAll(".btn-num, .btn-opr, #btn-perc");
const btnClear = document.querySelector("#btn-clear");
const btnDel = document.querySelector("#btn-del");
const btnEqual = document.querySelector("#btn-equal");

const displayCurr = document.querySelector("#curr-result");
const displayLast = document.querySelector("#last-result");

const optMenu = document.querySelector("#opt-menu");
const btnOpt = document.querySelector("#btn-opt");
const btnOptHistory = document.querySelector("#btn-opt-menu-history");
const btnOptAdvanced = document.querySelector("#btn-opt-menu-advanced");
const btnOptShortcut = document.querySelector("#btn-opt-menu-shortcut");
const btnCloseHistory = document.querySelector("#btn-close-history");

const wrapper = document.querySelector("#wrapper");

let cleanDisplay = false;
const operators = ["/", "x", "-", "+"];
let history = [];

// hide options menu if click out of it
document.addEventListener("click", function(event) {
    if (!optMenu.contains(event.target) && 
        !btnOpt.contains(event.target)) {
        optMenu.classList.remove("show");
    }
})

// retorna verdadeiro se str termina com algum dos sufixos
function endsWithAnyOf(str, suffixes) {
    // suffixes = suffixes.split(", ");
    return suffixes.some(suffix => str.endsWith(suffix));
}

function isOperator(char) {
    return operators.includes(char);
}

btnDisplayable.forEach(btn => btn.addEventListener("click", function() {
    if (cleanDisplay) {
        displayCurr.value = "";
        cleanDisplay = false;
    }
    let displayContent = displayCurr.value;
    let charToAppend = btn.textContent;

    // se for algum operador o substitui pelo operador corrente
    if (endsWithAnyOf(displayContent, operators) && 
        isOperator(charToAppend)) {
        displayContent = displayContent.slice(0, -1) + charToAppend;
    }
    else {
        displayContent += charToAppend;
    }
    displayCurr.value = displayContent;
}));

displayCurr.addEventListener("input", function() {
    let displayContent;
    if (cleanDisplay) {
        displayContent = displayCurr.value.slice(-1);
        displayLast.value = displayCurr.value.slice(0, -1);
        displayCurr.value = "";
        cleanDisplay = false;
    }else {

        displayContent = displayCurr.value.replaceAll("*", "x");
    }
    let charToAppend = displayContent.slice(-1);
    
    // se for algum operador o substitui pelo operador corrente
    if (endsWithAnyOf(displayContent.slice(0, -1), operators) && 
        isOperator(charToAppend)) {
        displayContent = displayContent.slice(0, -2) + charToAppend;
    }
    displayCurr.value = displayContent;
});

// calculates the result of the operation
btnEqual.addEventListener("click", solveExpression);

function replacePercentages(expression) {
    const regexPercentage = /(\d+(\.\d+)?)%/g;
    return expression.replace(regexPercentage, (match, p1) => `(${p1}/100)`);
}

function formattedExpression(exp) {
    exp = exp.replaceAll("x", "*");
    return replacePercentages(exp);
}

function evaluete(expression) {
    try {
    
        // verificando se ha caracteres invalidos
        if (/[^-()\d/*+.%\s]/.test(expression)) {
            throw new Error("Invalid characters in expression");
        }

        const result = eval(expression);

        if (result !== undefined) {
            registerOnHistory(expression, result);
        }
        else {
            result = "";
        }

        return result;

    } catch {
        return "Error";
    }
}

function registerOnHistory(expression, result) {
    let formatedExp = expression.replaceAll("*", "x");
    history.push(`${formatedExp} = ${result}`);
    console.log(history)
}

function solveExpression() {
    let displayContent = displayCurr.value;
    let expression = formattedExpression(displayContent);
    
    let result = evaluete(expression);


    displayCurr.value = result;
    displayLast.value = displayContent;
    cleanDisplay = true;
};

// cleans the display
btnClear.addEventListener("click", clearAll);

function clearAll() {
    displayCurr.value = "";
    displayLast.value = "";
}

btnDel.addEventListener("click", function() {
    displayCurr.value = displayCurr.value.slice(0, -1);
})

displayLast.addEventListener("click", function() {
    if (displayLast.value) {
        displayCurr.value = displayLast.value.replaceAll(" x ", "x").replaceAll("*", "x");
        displayLast.value = "";
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        solveExpression();
        cleanDisplay = true;
    }
    if(event.key === "e" && event.ctrlKey == true) {
        clearAll();
    }
})

btnOpt.addEventListener("click", function() {
    const optMenu = document.querySelector("#opt-menu");
    if (optMenu.classList.contains("show")) {
        optMenu.classList.remove("show");
    } else {
        optMenu.classList.add("show");
    }
});

btnOptHistory.addEventListener("click", function() {
    optMenu.classList.remove("show");

    let historyTab = document.querySelector("#history");
    
    if (!historyTab) {
        console.log("criar")
        historyTab = document.createElement("section");
        // <section class="frame" id="history">
        historyTab.classList.add("frame");
        historyTab.classList.add("show-flex");
        historyTab.id = "history";
        historyTab.innerHTML =
        `
        <div class="toolbar">
          <div class="title">History</div>
          <button class="btn btn-toolbar" id="btn-close-history">
            <img src="../assets/close_icon.svg" alt="close" class="icon">
          </button>
        </div>
        <span class="color-white">No history</span>
        `

        console.log(historyTab)
        console.log(historyTab.innerHTML)

        wrapper.appendChild(historyTab);
    }
    else {
        console.log("nao criar")
    }

    if (history.length !== 0) {
        console.log("com hist")
        // removendo a mensagem de "no history"
        historyTab.querySelector("span").remove();
        
        // colocar as expressoes na aba de historico
        for (expression of history) {
            const exp = document.createElement("div");
            exp.classList.add("expression");
            exp.innerHTML = `<span>${expression}</span>`;
            
            historyTab.appendChild(exp);
        }
        history = [];
    }

    const btnCloseHistory = historyTab.querySelector("#btn-close-history")

    btnCloseHistory.addEventListener("click", function() {
        const expressions = historyTab.querySelectorAll(".expression");
        expressions.forEach(function(exp) {
            history.push(exp.querySelector("span").textContent);
        })

        historyTab.remove();

        console.log(history)
    });

    const historyExps = historyTab.querySelectorAll(".expression");
    historyExps.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const expString = btn.querySelector("span").textContent;
            const parts = expString.split(" = ");

            // transfere a conta para a calculadora
            displayLast.value = parts[0];
            displayCurr.value = parts[1];
        });
    });
});

