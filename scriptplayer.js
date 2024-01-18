const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const musicCard = document.getElementById("musiccard");
const imagebox = document.getElementById("imagebox");
const currentSongName = document.getElementById("current-song-name");
const currentSongImage = document.getElementById("current-song-image");
// Add an event listener to the song list to play a song when clicked
const songList = document.getElementById("song-list");
// Songs Titles
const songs = ["Speak To Me","Breathe","On The Run","Time","Great Gig In The Sky","Money","Us and Them","Any Colour You Like","Brain Damage","Eclipse"];
// KeepTrack of song
currentTime = document.querySelector("#currentTime");
duration = document.querySelector("#duration");

// Update Progress bar
// Update Progress bar




let songIndex = 0;
// Initially load song details into DOM
loadSong(songs[songIndex]);
// Update song details
function loadSong(song) {
title.innerText = song;
currentSongName.innerText = song;

// Update the image source in the "current-song-image" element
currentSongImage.src = `./images/${song}.png`;

// Load the audio file
audio.src = `./music/${song}.mp3`;
cover.src = `./images/${song}.png`;
}




// Play Song
function playSong() {
musicContainer.classList.add("play");
playBtn.querySelector("i.fa").classList.remove("fa-play");
playBtn.querySelector("i.fa").classList.add("fa-pause");
audio.play();
}
// Pause Song
function pauseSong() {
musicContainer.classList.remove("play");
playBtn.querySelector("i.fa").classList.add("fa-play");
playBtn.querySelector("i.fa").classList.remove("fa-pause");
audio.pause();
}
// Previous Song
function prevSong() {
songIndex--;
if (songIndex < 0) {
songIndex = songs.length - 1;
}
loadSong(songs[songIndex]);
playSong();
}
// Next Song
function nextSong() {
songIndex++;
if (songIndex > songs.length - 1) {
songIndex = 0;
}
loadSong(songs[songIndex]);
playSong();
}
// Update Progress bar
function updateProgress(e) {
const { duration, currentTime } = e.srcElement;
const progressPerCent = (currentTime / duration) * 100;
progress.style.width = `${progressPerCent}%`;
}
// Set Progress
function setProgress(e) {
const width = this.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;
audio.currentTime = (clickX / width) * duration;
}
// Event Listeners
playBtn.addEventListener("click", () => {
const isPlaying = musicContainer.classList.contains("play");
if (isPlaying) {
pauseSong();
} else {
playSong();
}
});
// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
// Time/Song Update
audio.addEventListener("timeupdate", updateProgress);
// Click On progress Bar
progressContainer.addEventListener("click", setProgress);
// Song End
audio.addEventListener("ended", nextSong);

audio.addEventListener("ended", () => {
    nextSong(); // Automatically play the next song when the current song ends
  });

songList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const clickedSongIndex = e.target.getAttribute("data-song-index");
    songIndex = parseInt(clickedSongIndex);
    loadSong(songs[songIndex]);
    playSong();
  }
});

audio.addEventListener("timeupdate", songTimeUpdate);
function songTimeUpdate() {
  if (audio.duration) {
    let curmins = Math.floor(audio.currentTime / 60);
    let cursecs = Math.floor(audio.currentTime - curmins * 60);
    let durmins = Math.floor(audio.duration / 60);
    let dursecs = Math.floor(audio.duration - durmins * 60);

    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    currentTime.innerHTML = curmins + ":" + cursecs;
    duration.innerHTML = durmins + ":" + dursecs;
  } else {
    currentTime.innerHTML = "00" + ":" + "00";
    duration.innerHTML = "00" + ":" + "00";
  }
  }

  
// ... (your existing code)

// Add an event listener to detect changes in the 'audio' element
audio.addEventListener('volumechange', () => {
  // Dispatch a custom event named 'audioChange' when the 'audio' volume changes
  document.dispatchEvent(new Event('audioChange'));
});
