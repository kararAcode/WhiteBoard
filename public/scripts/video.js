const video = document.querySelector("#videoPlayer");
video.controls = false;

const videoControls = document.querySelector(".container #videoControls")
const icons = document.querySelectorAll("#playback-icons i");
const playBtn = document.querySelector("#playback-icons");
const timeElapsed = document.querySelector(".time-elapsed");
const videoDuration = document.querySelector(".video-duration");
const progressBar = document.querySelector("#progress-bar");
const seek = document.querySelector("#timeseek");
const seekPopup = document.querySelector(".timeseek-popup");
const fullScreenIcons = document.querySelector(".fullscreenBtns");
const container = document.querySelector(".container");

//volume controls
const volumeBtn = document.querySelector(".volume-btn");
const volumeIcons = document.querySelectorAll(".volume-btn i");
const volumeMute = document.querySelector(".volume-btn .fa-volume-xmark");
const volumeLow = document.querySelector(".volume-btn .fa-volume-low");
const volumeHigh = document.querySelector(".volume-btn .fa-volume-high");
const volume = document.querySelector("#volume");


video.addEventListener("play", changePlayButton);
video.addEventListener("pause", changePlayButton);
playBtn.addEventListener("click", togglePlay)
video.addEventListener("loadedmetadata", initVideo)
video.addEventListener("timeupdate", updateTime);
video.addEventListener("timeupdate", updateBar);
seek.addEventListener("mousemove", updateSeekPopup);
seek.addEventListener("input", skipAhead);
volume.addEventListener("input", updateVolumeBar);
volume.addEventListener("mouseover", showVolBar);
volume.addEventListener("mouseleave", hideVolBar);
volumeBtn.addEventListener("mouseover", showVolBar);
volumeBtn.addEventListener("mouseleave", showVolBar);
video.addEventListener("volumechange", updateVolIcon);
volumeBtn.addEventListener("click", toggleMute);
video.addEventListener("click", togglePlay);
window.addEventListener("keypress", (e) => {
    if (e.key === " ") {
        togglePlay();
    }
});
videoControls.addEventListener("mouseenter", showVideoControls);
videoControls.addEventListener("mouseleave", hideVideoControls);
video.addEventListener("mouseenter", showVideoControls);
video.addEventListener("mouseleave", hideVideoControls);
fullScreenIcons.addEventListener("click", toggleFullScreen);




function changePlayButton() {
    for (const icon of icons) {
        icon.classList.toggle("hidden");
    }
}

function togglePlay() {
    if (video.paused) {
        video.play();
    }

    else {
        video.pause();
    }
}

function formatTime(t) {
    const result = new Date(t * 1000).toISOString().substring(11, 19);

    return {
        minutes: result.substring(3, 5),
        seconds: result.substring(6, 8),

    }
}

function updateTime() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerHTML = `${time.minutes}:${time.seconds}`;

}

function initVideo() {
    const videoDur = Math.round(video.duration);
    progressBar.setAttribute("max", videoDur);
    seek.setAttribute("max", videoDur);

    const t = formatTime(videoDur);

    videoDuration.innerHTML = `${t.minutes}:${t.seconds}`
}

function updateBar() {
    seek.value  = Math.floor(video.currentTime);
    progressBar.style.width = `${video.currentTime/video.duration *100}%`;
}

function updateSeekPopup(e) {
    const skip = Math.round((e.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute("max"), 10));
    seek.setAttribute("data-seek", skip);
    const time = formatTime(skip);

    seekPopup.textContent = `${time.minutes}:${time.seconds}`;
    const rect = video.getBoundingClientRect();
    seekPopup.style.left = `${e.pageX -rect.left}px`;

}

function skipAhead(e) {
    const skipTo = e.target.dataset.seek ? e.target.dataset.seek : e.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;

}

function updateVolumeBar() {
    if (video.muted) {
        video.muted =false;
    }

    video.volume = volume.value;
}

function updateVolIcon() {
    volumeIcons.forEach((icon) => {
        icon.classList.add("hidden");
    });

    if (video.muted || video.volume === 0) {
        volumeMute.classList.remove("hidden");
    }

    else if (video.volume > 0 && video.volume < 0.5) {
        volumeLow.classList.remove("hidden");
    }

    else {
        volumeHigh.classList.remove("hidden");

    }
}

function showVolBar() {
    volume.classList.remove("hidden");
}

function hideVolBar() {
    setTimeout(() => {
        volume.classList.add("hidden");

    }, 500);
}

function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        volume.setAttribute("data-volume", volume.value);
        volume.value = 0;
    }

    else {
        volume.volume = volume.dataset.volume;
    }
}

function hideVideoControls() {
    if (video.paused) {
        return;
    } 

    else {
        videoControls.classList.add("hidden");
    }
}

function showVideoControls() {
    videoControls.classList.remove("hidden");
}

function toggleFullScreen() {
    for (child of fullScreenIcons.children) {
        child.classList.toggle("hidden");
    }
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    else {
        container.requestFullscreen();
    }
}

