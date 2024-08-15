const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
let slides = document.querySelectorAll(".slide");

let slidesNum = slides.length;
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", showSlide);
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide); 

function showSlide() {
    slides[slideIndex].classList.add("display");
    intervalId = setInterval(nextSlide, 5000);
}

function hideSlide() {
    slides[slideIndex].classList.remove("display");
}

function nextSlide() {
    hideSlide();
    slideIndex = (slideIndex + 1) % slidesNum;
    clearInterval(intervalId);
    showSlide();
};

function prevSlide() {
    hideSlide();
    if (slideIndex == 0) {
        slideIndex = slidesNum;
    }
    slideIndex = (slideIndex  - 1) % slidesNum;
    clearInterval(intervalId);
    showSlide();
};
