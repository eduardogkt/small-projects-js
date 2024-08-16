import { 
    endsWithAnyOf, 
    createNewElement, 
    addMessage, 
    copyToClipboard, 
    replacePercentages, 
    isOperator,
    isNumber,
    createNewTab,
    listenCloseTab,
    operators,
    NO_ID,
} from './utils.js';

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
const btnOptShortcut = document.querySelector("#btn-opt-menu-shortcut");

let cleanDisplay = false;
let history = [];

// hide options menu if click out of it
document.addEventListener("click", function(event) {
    if (!optMenu.contains(event.target) && !btnOpt.contains(event.target)) {
        optMenu.classList.remove("show");
    }
});

// keyboard events
document.addEventListener("keydown", function(event) {
    const keyPressed = event.key;
    const ctrlKeyPressed = event.ctrlKey === true;

    if (keyPressed === "Enter") {
        solveExpression();
    }
    if (keyPressed === "e" && ctrlKeyPressed) {
        clearAll();
    }
    if (keyPressed === "c" && ctrlKeyPressed) {
        copyToClipboard(displayCurr.value);
    }
    if (keyPressed === ";" && ctrlKeyPressed) {
        openHistoryTab();
    }
    if (keyPressed === "/" && ctrlKeyPressed) {
        openShortcutTab();
    }
});

// receiving input from digital keyboard
btnDisplayable.forEach(function(btn) {
    btn.addEventListener("click", function() {
        if (cleanDisplay) {
            displayCurr.value = "";
            cleanDisplay = false;
        }

        let displayContent = displayCurr.value;
        let charToAppend = btn.textContent;

        // if last char is an operator, replace it with the new operator 
        if (endsWithAnyOf(displayContent, operators) && 
            isOperator(charToAppend)) {
            displayContent = displayContent.slice(0, -1) + charToAppend;
        }
        // just append the new char to the end of the display content
        else {
            displayContent += charToAppend;
        }
        // if input is in the form "0number"
        if (displayContent.length === 2 &&
            displayContent.slice(0, -1).endsWith("0") && 
            isNumber(charToAppend)) {
            // remove o 0 e coloca so o numero
            displayContent = displayContent.slice(0, -2) + charToAppend;
        }
        displayCurr.value = displayContent;
    })
});


// receiving input from keyboard
displayCurr.addEventListener("input", function(event) {
    let displayContent;
    
    // clean display and its not backspace
    if (cleanDisplay && !(event.inputType === "deleteContentBackward")) {
        // the display content become only the new input char
        displayContent = displayCurr.value.slice(-1);

        // the result is the display content less the last char (new input char)
        displayLast.value = displayCurr.value.slice(0, -1);
        
        displayCurr.value = "";
        cleanDisplay = false;
    } else {
        displayContent = displayCurr.value.replaceAll("*", "x");
    }

    let charToAppend = displayContent.slice(-1);
    
    // if last char is an operator, replace it with the new operator 
    if (endsWithAnyOf(displayContent.slice(0, -1), operators) && 
        isOperator(charToAppend)) {
        displayContent = displayContent.slice(0, -2) + charToAppend;
    }
    // if input is in the form "0number"
    if (displayContent.length === 2 && 
        displayContent.slice(0, -1).endsWith("0") && 
        isNumber(charToAppend)) {
        // removes the 0 and append only the number
        displayContent = displayContent.slice(0, -2) + charToAppend;
    }
    displayCurr.value = displayContent;
});

// calculates the result of the operation
btnEqual.addEventListener("click", solveExpression);

// solves the expression
function solveExpression() {
    let displayContent = displayCurr.value;
    let expression = formattedExpression(displayContent);
    
    let result = evaluete(expression);

    displayCurr.value = result;
    displayLast.value = displayContent;
    cleanDisplay = true;

    let historyTab = document.querySelector("#history-tab");
    if (historyTab && result !== "Error") {
        updateHistory(historyTab);
    }
};

// format the input content to a valid expression
function formattedExpression(exp) {
    exp = exp.replaceAll("x", "*");
    return replacePercentages(exp);
}

// evaluates the expression
function evaluete(exp) {
    if (exp === "") {
        return "";
    }

    try {
        // checking for invalid arrangements
        if (/[^-()\d/*+.%\s]/.test(exp)) {
            throw new Error("Invalid characters in expression");
        }

        const result = eval(exp);

        if (result !== undefined) {
            registerOnHistory(exp, result);
        }
        else {
            result = "";
        }

        return result;

    } catch {
        return "Error";
    }
}

// store the expression and its result in the history
function registerOnHistory(exp, result) {
    let formatedExp = exp.replaceAll("*", "x");
    history.push(`${formatedExp} = ${result}`);
}

// clear the display
btnClear.addEventListener("click", clearAll);

// clear the display
function clearAll() {
    displayCurr.value = "";
    displayLast.value = "";
}

// deletes the last char of the display
btnDel.addEventListener("click", function() {
    displayCurr.value = displayCurr.value.slice(0, -1);
});

// replaces the content of the current display with the last operation
displayLast.addEventListener("click", function() {
    if (displayLast.value) {
        displayCurr.value = displayLast.value
                            .replaceAll("*", "x")
                            .replaceAll(" x ", "x");
        displayLast.value = "";
    }
});

// options menu activation
btnOpt.addEventListener("click", function() {
    const optMenu = document.querySelector("#opt-menu");
    if (optMenu.classList.contains("show")) {
        optMenu.classList.remove("show");
    } else {
        optMenu.classList.add("show");
    }
});

// put the history entry in the history tab and wait for close/copy
function updateHistory(historyTab) {
    // removing "no history" message
    historyTab.querySelector("span")?.remove();

    // removing the "clear history" button
    historyTab.querySelector("#btn-clear-history")?.remove();

    const historyEntrysSection = document.querySelector("#history-expressions");
    
    // appending the expressions to the history tab
    for (let expression of history) {
        const entry = createNewElement("div", NO_ID, "", "history-entry");

        const entryExp = createNewElement("input", NO_ID, "", "history-entry-exp");
        entryExp.type = "text";
        entryExp.value = expression;
        entryExp.readOnly = true;

        entry.appendChild(entryExp);
        
        historyEntrysSection.prepend(entry);
    }
    // remove all the elements from the history
    history = [];

    // add clear history button
    const btnClearHistory = 
        createNewElement("button", "btn-clear-history", "Clear History", "btn");
    historyTab.appendChild(btnClearHistory);

    // event listner clear history
    btnClearHistory.addEventListener("click", function() {
        // removing all the history entrys
        const entrys = historyTab.querySelectorAll(".history-entry");
        entrys.forEach(entry => entry.remove());
        btnClearHistory.remove();

        addMessage(historyTab, "No history", "no-history-msg");
    });

    // event listner copy the expression from the history to calculator
    const entrys = historyTab.querySelectorAll(".history-entry");
    entrys.forEach(function(entry) {
        entry.addEventListener("click", function() {
            const entryExpValue = entry.querySelector("input").value;
            const [exp, result] = entryExpValue.split(" = ");

            displayLast.value = exp;
            displayCurr.value = result;
        });
    });
}

// open history tab
btnOptHistory.addEventListener("click", openHistoryTab);

function openHistoryTab() {
    let historyTab = 
    openTab(
        "history-tab",
        `
        <div class="toolbar">
          <div class="title">History</div>
          <button class="btn btn-toolbar btn-close">
            <img src="../assets/icons/close_icon.svg" alt="close" class="icon">
          </button>
        </div>
        <div id="history-expressions"></div>`,
        saveHistory  // saves history when closing
    );

    addMessage(historyTab, "No history", "no-history-msg");

    // if theres's entrys in the history array
    if (history.length > 0) {
        updateHistory(historyTab);
    }
}

function saveHistory(historyTab) {
    const entrys = historyTab.querySelectorAll(".history-entry");
    history = [];    
    entrys.forEach(function(entry) {
        const entryExpValue = entry.querySelector("input").value;
        history.push(entryExpValue);
    });
}

// open shortcut tab
btnOptShortcut.addEventListener("click", openShortcutTab); 

function openShortcutTab() {
    openTab(
        "shortcut-tab", 
        `
        <div class="toolbar">
          <div class="title">Shortcuts</div>
          <button class="btn btn-toolbar btn-close">
            <img src="../assets/icons/close_icon.svg" alt="close" class="icon">
          </button>
        </div>

        <div class="shortcut">
          <span class="shortcut-name">Clean all</span>
          <div>
            <span class="shortcut-keys">ctrl</span>
            <span class="shortcut-keys">e</span>
          </div>
        </div>
        <div class="shortcut">
        <span class="shortcut-name">Copy</span>
          <div>
            <span class="shortcut-keys">ctrl</span>
            <span class="shortcut-keys">c</span>
          </div>
        </div>
        <div class="shortcut">
          <span class="shortcut-name">Open shortcuts</span>
          <div>
            <span class="shortcut-keys">ctrl</span>
            <span class="shortcut-keys">/</span>
          </div>
        </div>
        <div class="shortcut">
          <span class="shortcut-name">Open history</span>
          <div>
            <span class="shortcut-keys">ctrl</span>
            <span class="shortcut-keys">;</span>
          </div>
        </div>`
    );
}

function openTab(tabId, innerHTML, closingRoutine) {
    optMenu.classList.remove("show");

    // close all open tabs exept the current tab
    closeOtherTabs(tabId);

    let tab = document.querySelector(`#${tabId}`);

    // creating tab if it doesn't exist
    tab = tab || createNewTab(tabId, innerHTML);

    listenCloseTab(tab, closingRoutine);
    return tab;
}

function closeOtherTabs(tabId) {
    let otherTabs = document.querySelectorAll(`.tab:not(#${tabId})`);
    otherTabs?.forEach(function(tab) {
        if (tab.id === "history-tab") {
            saveHistory(tab);
        }
        tab.remove();
    });
}