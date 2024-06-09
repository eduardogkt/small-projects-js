const aboutBtn = document.getElementById("about-me-button");
const aboutCard = document.getElementById("about-me-card");

aboutBtn.addEventListener("click", function() {
    if (aboutCard.style.visibility === "visible") {
        aboutCard.style.visibility = "hidden";
    }
    else {
        aboutCard.style.visibility = "visible";
    }
});