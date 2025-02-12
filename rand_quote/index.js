document.addEventListener("DOMContentLoaded", function () {});

lucide.createIcons();

const apiURL = "http://api.quotable.io/random";

const newBtn = document.querySelector("#new");
const copyBtn = document.querySelector("#copy");
const quoteBox = document.querySelector("#quote");
const authorBox = document.querySelector("#author");

copyBtn.addEventListener("click", function () {
    const text = '"' + quoteBox.innerHTML + '" ' + authorBox.innerHTML;
    navigator.clipboard.writeText(text);

    copyBtn.innerHTML = `<i data-lucide="check" class="icon"></i>`;
    lucide.createIcons();

    setTimeout(restoreIcon, 500);
});

function restoreIcon() {
    copyBtn.innerHTML = `<i data-lucide="copy" class="icon"></i>`;
    lucide.createIcons();
}

async function getQuote(url) {
    const response = await fetch(url);
    let data = await response.json();

    quoteBox.textContent = data.content;
    authorBox.textContent = "— " + data.author;
}

newBtn.addEventListener("click", function () {
    getQuote(apiURL);
});

getQuote(apiURL);
