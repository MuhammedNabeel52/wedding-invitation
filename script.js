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

const curtain = document.getElementById('intro-curtain');
const curtainButton = document.getElementById('open-curtain');

function openCurtain() {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('open');
    }

    document.body.classList.add('intro-entered');
    if (curtain) {
        setTimeout(() => curtain.remove(), 900);
    }
}

if (curtainButton) {
    curtainButton.addEventListener('click', openCurtain);
}

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

// Scroll Animations + lazy loading
const sections = document.querySelectorAll('.section');
const nav = document.querySelector('nav');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

function loadLazyMedia(root) {
    const elements = (root || document).querySelectorAll('[data-src]');
    elements.forEach(el => {
        const src = el.getAttribute('data-src');
        if (!src) return;
        el.src = src;
        el.removeAttribute('data-src');
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            loadLazyMedia(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Gallery Slider
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.gallery-item');
const prevControl = document.querySelector('.slider-control.prev');
const nextControl = document.querySelector('.slider-control.next');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentGalleryIndex = 0;
let galleryInterval;

function updateGallerySlider(index) {
    if (!sliderTrack || sliderItems.length === 0) return;
    currentGalleryIndex = (index + sliderItems.length) % sliderItems.length;
    sliderTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    sliderItems.forEach((item, i) => item.classList.toggle('active', i === currentGalleryIndex));
    sliderDots.forEach((dot, i) => dot.classList.toggle('active', i === currentGalleryIndex));
}

function startGalleryAutoPlay() {
    if (galleryInterval) clearInterval(galleryInterval);
    galleryInterval = setInterval(() => updateGallerySlider(currentGalleryIndex + 1), 2500);
}

if (prevControl) {
    prevControl.addEventListener('click', () => {
        updateGallerySlider(currentGalleryIndex - 1);
        startGalleryAutoPlay();
    });
}

if (nextControl) {
    nextControl.addEventListener('click', () => {
        updateGallerySlider(currentGalleryIndex + 1);
        startGalleryAutoPlay();
    });
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateGallerySlider(index);
        startGalleryAutoPlay();
    });
});

window.addEventListener('resize', () => updateGallerySlider(currentGalleryIndex));
updateGallerySlider(0);
startGalleryAutoPlay();

// Music Toggle
const musicToggleBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggleBtn.innerHTML = '🎵 Toggle Music';
        } else {
            bgMusic.play();
            musicToggleBtn.innerHTML = '🔇 Toggle Music';
        }
        isPlaying = !isPlaying;
    });
}

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
        }
    });
});

