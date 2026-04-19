// Dynamic Content Population
const weddingData = {
    coupleNames: "Nabeel & Rinsha<br>Naseeh & Liya",
    inviteText: "Together with their families invite you to celebrate their wedding",
    weddingDate: "May 20, 2026",
    weddingTime: "1:00 PM",
    venue: "Madavoor Palace",
    nikahTime: "11:30 AM",
    receptionTime: "1:00 PM"
};

function populateContent() {
    document.getElementById('couple-names').innerHTML = weddingData.coupleNames;
    document.getElementById('invite-text').innerText = weddingData.inviteText;
    document.getElementById('wedding-date').innerText = weddingData.weddingDate;
    document.getElementById('wedding-time').innerText = weddingData.weddingTime;
    // Add more if needed
}

populateContent();

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('May 20, 2026 13:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        }
    } else {
        const timerEl = document.getElementById('timer');
        if (timerEl) {
            timerEl.innerHTML = '<p>The wedding has started!</p>';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Scroll Animations
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Music Toggle
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '🎵 Toggle Music';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '🔇 Toggle Music';
    }
    isPlaying = !isPlaying;
});

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});