
let userPIN = "";

const correctPIN = "111111";

function openGift() {
    const pinScreen = document.getElementById("pinScreen");
    pinScreen.classList.remove("hidden");
}

function addDigit(number) {
    if (userPIN.length < 6) {
        userPIN += number;
    }

    updatePIN();
}

function deleteDigit() {
    userPIN = userPIN.slice(0, -1);
    updatePIN();
}

function updatePIN() {
    const display = document.getElementById("pinDisplay");

    display.textContent =
        "● ".repeat(userPIN.length) +
        "○ ".repeat(6 - userPIN.length);
}

function checkPIN() {
    const message = document.getElementById("pinMessage");

    if (userPIN.length < 6) {
        message.textContent = "PIN harus 6 digit!";
    }

    else if (userPIN === correctPIN) {
        document.querySelector(".container").classList.add("hidden");

       document.getElementById("pinScreen").classList.add("hidden");

       document.getElementById("giftScreen").classList.remove("hidden");
    }

    else {
        message.textContent = "PIN salah, kamu lupa ya?!";
        userPIN = "";
        updatePIN();
    }
}

function openMessage() {
    const message = document.getElementById("specialMessage");
    message.classList.remove("hidden");
}

function updateCountdown() {
    const targetDate = new Date("2027-02-07T00:00:00").getTime();
    const now = new Date().getTime();

    const distance = targetDate - now;

    const countdown = document.getElementById("countdown");

    if (distance <= 0) {
        countdown.textContent = "Selamat ulang tahun! 🎂";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdown.textContent =
        `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

function openBirthdayGift() {
    const giftBox = document.querySelector(".gift-box");

    if (giftBox.classList.contains("opened")) {
        return;
    }

    const explosionSound = document.getElementById("explosionSound")

    explosionSound.currentTime = 0;
    explosionSound.play();

    giftBox.classList.add("opened");

    
    const flowerBurst = document.createElement("div");
    flowerBurst.className = "flower-burst";
    document.body.appendChild(flowerBurst);

    
    const colors = [
        "#ff8fab",
        "#ffb3c6",
        "#ffffff",
        "#f9a8d4",
        "#b8a1ff",
        "#ffd166"
    ];

    
    const boxPosition = giftBox.getBoundingClientRect();

    const centerX = boxPosition.left + boxPosition.width / 2;
    const centerY = boxPosition.top + boxPosition.height / 2;

    
    for (let i = 0; i < 200; i++) {
        const flower = document.createElement("div");
        flower.className = "burst-flower";

        
        for (let j = 0; j < 6; j++) {
            const petal = document.createElement("i");
            petal.style.setProperty("--angle", `${j * 60}deg`);
            flower.appendChild(petal);
        }

        
        const center = document.createElement("b");
        flower.appendChild(center);

        const dx = Math.random() * window.innerWidth - centerX;
        const dy = Math.random() * window.innerHeight - centerY;
       
        flower.style.left = centerX + "px";
        flower.style.top = centerY + "px";

        flower.style.setProperty("--dx", dx + "px");
        flower.style.setProperty("--dy", dy + "px");
        flower.style.setProperty("--spin", (Math.random() * 720) + "deg");
        flower.style.setProperty("--size", 1.2 + Math.random() * 1.3);
        flower.style.setProperty("--delay", (Math.random() * 0.12) + "s");
        flower.style.setProperty(
            "--flower-color",
            colors[Math.floor(Math.random() * colors.length)]
        );

        flowerBurst.appendChild(flower);
    }

    
    setTimeout(function() {
        document.getElementById("giftScreen").classList.add("hidden");
        document.getElementById("birthdayScreen").classList.remove("hidden");

        playSong(0);

        flowerBurst.remove();
    }, 1750);
}

function blowCandle(flame) {
    flame.classList.add("off");
}

function blowOutCandle(button) {
    button.classList.add("off");
    button.textContent = "";
    button.disabled = true;
}

function changeSong(songName) {
    if (songName === "masa-mudaku-habis") {
        playSong(0);
    } else if (songName === "monokrom") {
        playSong(1);
    }
}

let currentSong = 0;

const playlist = [
    "music/masa-mudaku-habis.mp3",
    "music/monokrom.mp3"
];

function toggleMusic() {
    const music = document.getElementById("musicAudio");
    const button = document.getElementById("playButton");

    if (music.paused) {
        music.play()
            .then(() => {
                button.textContent = "⏸";
            })
            .catch(error => {
                console.log("Musik gagal diputar:", error);
            });
    } else {
        music.pause();
        button.textContent = "▶";
    }
}

function playSong(index) {
    const music = document.getElementById("musicAudio");

    currentSong = index;
    music.src = playlist[currentSong];
    music.play();

    document.getElementById("playButton").textContent = "⏸";

    const songInfo = [
        {
            title: "Masa Mudaku Habis",
            artist: "Ghea Indrawari"
        },
        {
            title: "Monokrom",
            artist: "Tulus"
        }
    ];

    document.getElementById("nowPlayingTitle").textContent =
        songInfo[index].title;

    document.getElementById("nowPlayingArtist").textContent =
        songInfo[index].artist;
}

function previousSong() {
    playSong((currentSong - 1 + playlist.length) % playlist.length);
}

function nextSong() {
    playSong((currentSong + 1) % playlist.length);
}

const musicAudio = document.getElementById("musicAudio");

function updateProgress() {
    const current = musicAudio.currentTime;
    const duration = musicAudio.duration;

    if (Number.isFinite(duration) && duration > 0) {
        const progress = (current / duration) * 100;

        if (Math.abs(Number(seekBar.value) - progress) > 0.1) {
            seekBar.value = progress;
        }

        document.getElementById("currentTime").textContent =
            formatTime(current);

        document.getElementById("duration").textContent =
            formatTime(duration);
    }

    if (!musicAudio.paused && !musicAudio.ended) {
        requestAnimationFrame(updateProgress);
    }
}

musicAudio.addEventListener("play", function() {
    requestAnimationFrame(updateProgress);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

const seekBar = document.getElementById("seekBar");

musicAudio.addEventListener("play", function() {
    requestAnimationFrame(updateProgress);
});

seekBar.addEventListener("input", function () {
    if (musicAudio.duration > 0) {
        musicAudio.currentTime =
            (seekBar.value / 100) * musicAudio.duration;
    }
});

musicAudio.addEventListener("ended", function () {
    if (currentSong < playlist.length - 1) {
        nextSong();
    } else {
        playSong(0);
    }
});

const testSound = document.getElementById("explosionSound");

testSound.addEventListener("error", function () {
    console.log("File suara gagal dimuat!");
});

testSound.addEventListener("canplaythrough", function () {
    console.log("File suara berhasil dimuat!");
});