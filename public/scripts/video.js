const video = document.querySelector("#videoPlayer");
video.controls = false;

// video elements
const videoControls = document.querySelector(".container #videoControls")
const icons = document.querySelectorAll("#playback-icons i");
const playBtn = document.querySelector("#playback-icons");
const timeElapsed = document.querySelector(".time-elapsed");
const videoDuration = document.querySelector(".video-duration");
const progressBar = document.querySelector("#progress-bar");
const seek = document.querySelector("#timeseek");
const seekPopup = document.querySelector(".timeseek-popup");
const fullScreenIcons = document.querySelector(".fullscreenBtns");
const container = document.querySelector(".videoContainer");

//volume controls
const volumeBtn = document.querySelector(".volume-btn");
const volumeIcons = document.querySelectorAll(".volume-btn i");
const volumeMute = document.querySelector(".volume-btn .fa-volume-xmark");
const volumeLow = document.querySelector(".volume-btn .fa-volume-low");
const volumeHigh = document.querySelector(".volume-btn .fa-volume-high");
const volume = document.querySelector("#volume");


// eventlisteners for video
video.addEventListener("play", changePlayButton); // changes icon to play or pause depending on the video state
video.addEventListener("pause", changePlayButton);
playBtn.addEventListener("click", togglePlay); // plays or pauses the video when btn is clicked
video.addEventListener("loadedmetadata", initVideo); // waits until video is loaded to display video duration
video.addEventListener("timeupdate", updateTime); 
video.addEventListener("timeupdate", updateBar);
seek.addEventListener("mousemove", updateSeekPopup);
seek.addEventListener("input", skipAhead); // if scroll input is moved, the current time will update
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
//if you hover off the video controls or video, video controls will be hidden
videoControls.addEventListener("mouseenter", showVideoControls);
videoControls.addEventListener("mouseleave", hideVideoControls);
video.addEventListener("mouseenter", showVideoControls);
video.addEventListener("mouseleave", hideVideoControls);
fullScreenIcons.addEventListener("click", toggleFullScreen); // toggle fullscreen when button is clicked


function changePlayButton() {
    // toggles icon apperances
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

    const result = new Date(t * 1000).toISOString().substring(11, 19); // re

    // formats time and returns it as minutes and seconds
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

    videoDuration.innerHTML = `${t.minutes}:${t.seconds}`; // sets text to video duration
}

function updateBar() {
    seek.value  = Math.floor(video.currentTime);
    progressBar.style.width = `${video.currentTime/video.duration *100}%`;
}

function updateSeekPopup(e) {
    // this code is currently not being used in this instance of the project
    // this is supposed to show a timestamp whenver you hover over a certain part of the video timeline
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

    video.volume = volume.value; // volume is set based on our range input
}

function updateVolIcon() {
    // displays an icons based on the current volume

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
    // a timer is used so the user can use the range input without it disappearing instantly
    // usually it will disappear if you hover off the volume icon
    setTimeout(() => {
        volume.classList.add("hidden");

    }, 500);
}

function toggleMute() {
    // if it is muted it will switch to the volume it had before
    // otherwise it will mute

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
    //
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
        videoControls.style.bottom = "";

        document.exitFullscreen();

    }

    else {
        container.requestFullscreen();
        videoControls.style.bottom = "1px";
    }
}

