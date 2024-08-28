document.addEventListener("DOMContentLoaded", function() {

lucide.createIcons();

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

const search = document.querySelector(".search-input");

search.addEventListener("keyup", function() {
    let value = this.value.toLowerCase();
    let projects = document.querySelectorAll(".card-title");

    projects.forEach(function(project) {
        const projectName = project.textContent.toLocaleLowerCase();
        if (projectName.includes(value)) {
            project.closest(".card").classList.remove("hide");
        }
        else {
            project.closest(".card").classList.add("hide");
        }
    })
});

});