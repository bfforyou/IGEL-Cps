
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

function changeSong(songId) {
    const musicFrame = document.getElementById("musicFrame");

    musicFrame.src =
        "https://www.youtube.com/embed/" + songId + "?autoplay=1";
}