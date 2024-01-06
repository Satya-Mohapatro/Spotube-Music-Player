
console.log("Welcome to Spotube");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Content/Song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

masterSongName.innerText = "Spotube";

let songs = [
    { songName: "Husn", filePath: "Content/Song/1.mp3", coverPath: "Content/Covers/1.jpeg" },
    { songName: "Baarishein", filePath: "Content/Song/2.mp3", coverPath: "Content/Covers/2.jpg" },
    { songName: "Alag Aasmaan", filePath: "Content/Song/3.mp3", coverPath: "Content/Covers/3.jpeg" },
    { songName: "Gul", filePath: "Content/Song/4.mp3", coverPath: "Content/Covers/4.jpeg" },
    { songName: "Mazaak", filePath: "Content/Song/5.mp3", coverPath: "Content/Covers/5.jpeg" },
    { songName: "Mishri", filePath: "Content/Song/6.mp3", coverPath: "Content/Covers/6.jpeg" },
    { songName: "Riha", filePath: "Content/Song/7.mp3", coverPath: "Content/Covers/7.jpeg" },
    { songName: "Meri Baaton Mein Tu", filePath: "Content/Song/8.mp3", coverPath: "Content/Covers/8.jpeg" },
    { songName: "Antariksh", filePath: "Content/Song/9.mp3", coverPath: "Content/Covers/9.jpeg" },
    { songName: "Maula", filePath: "Content/Song/10.mp3", coverPath: "Content/Covers/10.png" },
];

// Populate song items in the HTML
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to reset play icons for all songs
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Add click event listeners for individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Add click event listener for the next button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Add click event listener for the previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
