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

    let historyTab = document.querySelector("#history-tab");
    if (historyTab) {
        updateHistory(historyTab);
    }
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

function copyDisplayContent() {
    navigator.clipboard.writeText(displayCurr.value);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        solveExpression();
        cleanDisplay = true;
    }
    if (event.key === "e" && event.ctrlKey == true) {
        clearAll();
    }
    if (event.key === "c" && event.ctrlKey == true) {
        copyDisplayContent();
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

function updateHistory(historyTab) {
    // removendo a mensagem de "no history"
    const span = historyTab.querySelector("span");
    if (span) {
        span.remove();
    }

    const clearButton = historyTab.querySelector("#btn-clear-history");
    if (clearButton) {
        clearButton.remove();
    }

    const historyEntrysSection = document.querySelector("#history-expressions");
    // colocar as expressoes na aba de historico
    for (expression of history) {
        const btn = document.createElement("div");
        btn.classList.add("expression");

        const input = document.createElement("input");
        input.classList.add("history-entry")
        input.type = "text";
        input.readOnly = true;
        input.value = expression;
        btn.appendChild(input);
        
        historyEntrysSection.prepend(btn);
    }
    history = [];

    // criando botão de limpar historico
    const btnClearHistory = document.createElement("button");
    btnClearHistory.classList.add("btn");
    btnClearHistory.id = "btn-clear-history";
    btnClearHistory.textContent = "Clear history";
    historyTab.appendChild(btnClearHistory);

    // evento de limpar historico
    btnClearHistory.addEventListener("click", function() {
        const expressions = historyTab.querySelectorAll(".expression");
        expressions.forEach(function(exp) {
            exp.remove();
        })
        btnClearHistory.remove();

        const noHistoryMessage = document.createElement("span");
        noHistoryMessage.classList.add("text");
        noHistoryMessage.textContent = "No history";
        historyTab.appendChild(noHistoryMessage);
    });

    // copiar a expressão do historico para a calculadora
    const historyExps = historyTab.querySelectorAll(".expression");
    historyExps.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const expString = btn.querySelector("input").value;
            const parts = expString.split(" = ");

            // transfere a conta para a calculadora
            displayLast.value = parts[0];
            displayCurr.value = parts[1];
        });
    });
}

btnOptHistory.addEventListener("click", function() {
    optMenu.classList.remove("show");

    let historyTab = document.querySelector("#history-tab");
    
    if (!historyTab) {
        // criando a aba de historico se não existir
        historyTab = document.createElement("section");
        historyTab.classList.add("frame");
        historyTab.classList.add("show-flex");
        historyTab.id = "history-tab";
        historyTab.innerHTML =
        `
        <div class="toolbar">
          <div class="title">History</div>
          <button class="btn btn-toolbar" id="btn-close-history">
            <img src="../assets/close_icon.svg" alt="close" class="icon">
          </button>
        </div>
        <div id="history-expressions"></div>
        `
        // cria mensagem de "no history"
        const noHistoryMessage = document.createElement("span");
        noHistoryMessage.classList.add("text");
        noHistoryMessage.textContent = "No history";
        historyTab.appendChild(noHistoryMessage);

        wrapper.appendChild(historyTab);
    }

    if (history.length !== 0) {
        updateHistory(historyTab);
    }

    // evento de clicar para fechar o historico
    const btnCloseHistory = historyTab.querySelector("#btn-close-history")
    btnCloseHistory.addEventListener("click", function() {
        console.log("fsd")
        const expressions = historyTab.querySelectorAll(".expression");
        expressions.forEach(function(exp) {
            history.unshift(exp.querySelector("input").value);
        })

        historyTab.remove();

        console.log(history)
    });
});


btnOptShortcut.addEventListener("click", function() {
    optMenu.classList.remove("show");

    let shortcutTab = document.querySelector("#shortcut-tab");

    if (!shortcutTab) {
        shortcutTab = document.createElement("section");
        shortcutTab.classList.add("frame");
        shortcutTab.classList.add("show-flex");
        shortcutTab.id = "shortcut-tab";
        shortcutTab.innerHTML =
        `
        <div class="toolbar">
          <div class="title">Shortcuts</div>
          <button class="btn btn-toolbar" id="btn-close-shortcut">
            <img src="../assets/close_icon.svg" alt="close" class="icon">
          </button>
        </div>

        <div class="shortcut">
          <span class="shortcut-name">Clean all</span>
          <span class="shortcut-keys">ctrl + e</span>
        </div>
        <div class="shortcut">
          <span class="shortcut-name">Copy</span>
          <span class="shortcut-keys">ctrl + c</span>
        </div>
        `
        // cria mensagem de "no history"
        wrapper.appendChild(shortcutTab);
    }

    // evento de clicar para fechar o historico
    const btnCloseShortcut = shortcutTab.querySelector("#btn-close-shortcut");
    btnCloseShortcut.addEventListener("click", function() {
        console.log("fsd")
        shortcutTab.remove();
    });
});