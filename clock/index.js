lucide.createIcons();

function formatTime(timeParameter) {
    return timeParameter.toString().padStart(2, 0);
}

Date.prototype.getMonthName = function(lang = "default", form) {
    return this.toLocaleString(lang, {month : form})
               .toLowerCase();
};

function updateDate() {

    const now = new Date();

    const dateFormat = document.querySelector("#date-format").value;
    let dateString = (dateFormat === "opt-mdy") ? 
                      getDateString("en", "long") : 
                      getDateString("pt", "long");
    document.querySelector("#date").textContent = dateString;

    function getDateString(lang, montForm) {
        let year = now.getFullYear();
        let month = now.getMonthName(lang, montForm);
        let day = now.getDate();

        switch (lang) {
            case "en": return `${month} ${day}, ${year}`;
            case "pt": return `${day} de ${month} de ${year}`;
        }
    }
}

function updateClock() {

    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let meridiem = "";

    const timeFormat = document.querySelector("#time-format").value;

    if (timeFormat === "opt-12h") {
        meridiem = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
    }
    
    hours = formatTime(hours);
    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`
    document.querySelector("#clock").textContent = timeString;
}

setInterval(updateDate, 2000);
setInterval(updateClock, 1000);


const btnAdjusts = document.querySelector("#btn-adjust");

btnAdjusts.addEventListener("click", function() {
    const adjustMenu = document.querySelector("#adjust-menu");
    adjustMenu.style.visibility = 
    (adjustMenu.style.visibility === "visible") ?
    "hidden" : "visible";
});

