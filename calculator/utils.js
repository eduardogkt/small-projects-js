const operators = ["/", "x", "-", "+"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const NO_ID = null;

// returns true is char is an operator
function isOperator(char) {
    return operators.includes(char);
}

function isNumber(char) {
    return numbers.includes(char);
}

// returns true if str ends with one of the suffixes
function endsWithAnyOf(str, suffixes) {
    return suffixes.some(suffix => str.endsWith(suffix));
}

// create a new doucument element
function createNewElement(type, id, textContent, classes) {
    const newElement = document.createElement(type);
    if (id)          newElement.id = id;
    if (textContent) newElement.textContent = textContent;
    if (classes)     newElement.classList.add(...classes.split(", "));
    return newElement;
}

// add a text message to parentNode
function addMessage(parentNode, textContent, id) {
    const alreadyHasMessage = parentNode.querySelector(`#${id}`);
    if (!alreadyHasMessage) {
        const message = createNewElement("span", id, textContent, "text");
        parentNode.appendChild(message);
    }
}

// copies the text to the clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

// replace n% with (n/100)
function replacePercentages(exp) {
    const regexPercentage = /(\d+(\.\d+)?)%/g;
    return exp.replace(regexPercentage, (match, p1) => `(${p1}/100)`);
}

// creates a new tab
function createNewTab(id, innerHTML) {
    const wrapper = document.querySelector("#wrapper");
    const newTab = createNewElement("section", id, "", "frame, tab");

    newTab.innerHTML = innerHTML;
    wrapper.appendChild(newTab);
    
    return newTab;
}

// listen for tab close
function listenCloseTab(tab, closingRoutine) {
    const btnCloseTab = tab.querySelector(".btn-close");

    btnCloseTab.addEventListener("click", function() {
        if (closingRoutine) {
            closingRoutine(tab);
        }
        tab.remove();
    });
}

export { 
    endsWithAnyOf, 
    createNewElement, 
    addMessage, 
    copyToClipboard , 
    replacePercentages, 
    isOperator, 
    isNumber,
    createNewTab,
    listenCloseTab,
    operators,
    NO_ID,
};