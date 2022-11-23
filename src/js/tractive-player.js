const playerContainer = document.getElementById('player-container');
const video = document.getElementById('video');
const playerControls = document.getElementById('player-controls');
const playButton = document.getElementById('play-btn');
const playIcons = playButton.querySelectorAll('.icon');
const timeElapsed = document.getElementById('time-elapsed');
const volumeControl = document.getElementById("volume-control");
const volumeBar = document.getElementById("volume-bar");


function toggleVideoState() {
    if (video.paused || video.ended) {
        video.play();
        playButton.setAttribute('aria-label', 'pause')
    } else {
        video.pause();
        playButton.setAttribute('aria-label', 'play')
    }
}

function convertTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000);
    return {
        minutes: result.getMinutes(),
        seconds: result.getSeconds(),
    };
}

function updateTimeElapsed() {
    const time = convertTime(Math.round(video.currentTime));
    let temp = (time.minutes < 10) ? "0" : "" + time.minutes;
    temp += ((time.seconds < 10) ? ":0" : ":") + time.seconds;
    timeElapsed.innerText = temp;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}


function updateIconsState() {
  playIcons.forEach(icon => icon.classList.toggle('hidden'));
}
function updateVolume() {
    video.volume = volumeBar.value/100;
}
function updateVolumeIcon() {
    const volume = parseInt(volumeBar.value);
    volumeControl.className = "volume-control";
    volumeControl.classList.add("volume-" + volume);
}


playButton.addEventListener('click', toggleVideoState);
video.addEventListener('play', updateIconsState);
video.addEventListener('pause', updateIconsState);
video.addEventListener('timeupdate', updateTimeElapsed);
volumeBar.addEventListener('input', updateVolume);
volumeBar.addEventListener('change', updateVolume);
video.addEventListener('volumechange', updateVolumeIcon);