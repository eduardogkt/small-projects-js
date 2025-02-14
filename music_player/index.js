document.addEventListener("DOMContentLoaded", function() {

lucide.createIcons();

const song = document.querySelector("#song");
const slider = document.querySelector("#progress");
const playBtn = document.querySelector("#play");
let playing = false;

song.load();

// ajuste da barra de progresso para o player
song.addEventListener("loadedmetadata", function() {
    slider.max = song.duration;
    slider.value = song.currentTime;
    console.log("canção carregada");
});

song.addEventListener("play", function() {
    setInterval(() => {
        slider.value = song.currentTime;
        updateSlider();
    }, 500);
});

function updateSlider() {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    console.log(slider.max)
    console.log(percent)
    slider.style.setProperty("--progress", percent + "%");
    slider.style.setProperty("background", `linear-gradient(to right, hsl(30, 100%, 5%) ${percent}%, #ccc ${percent}%)`);
}

function playPause() {
    if (playing === true) {
        playBtn.innerHTML = `<i data-lucide="play" class="icon"></i>`;
        song.pause()
    }
    else {
        playBtn.innerHTML = `<i data-lucide="pause" class="icon"></i>`;
        song.play()
    }
    playing = !playing;
    lucide.createIcons();
}

// controle a canção pela barra de progresso
function updateSong() {
    song.play();
    song.currentTime = slider.value;
    playBtn.innerHTML = `<i data-lucide="pause" class="icon"></i>`;
    playing = true;
    lucide.createIcons();
    updateSlider();
}

slider.addEventListener("input", updateSlider);
slider.addEventListener("change", updateSong);

playBtn.addEventListener("click", playPause);

});
