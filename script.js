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
let isPlaying = false;

function openCurtain() {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('open');
    }

    // Trigger confetti animation with wedding theme
    if (typeof confetti !== 'undefined') {
        // First burst
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ff69b4', '#ffb6c1', '#ffffff', '#ffd700', '#ff1493'],
            shapes: ['circle', 'square'],
            scalar: 0.8
        });

        // Second burst with hearts
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff69b4', '#ffb6c1', '#ffffff', '#ffd700'],
                shapes: ['circle'],
                scalar: 1.2,
                gravity: 0.6,
                emoji: '❤️'
            });
        }, 500);

        // Third burst
        setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ff1493', '#ffffff', '#ffd700'],
                shapes: ['circle', 'square'],
                scalar: 0.9,
                gravity: 0.8
            });
        }, 1000);
    }

    // Autoplay music when envelope opens
    const bgMusic = document.getElementById('bg-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    if (bgMusic) {
        bgMusic.play().then(() => {
            isPlaying = true;
            if (musicToggleBtn) musicToggleBtn.innerHTML = '🔇';
        }).catch(() => {
            // Handle autoplay failure
        });
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

if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggleBtn.innerHTML = '♪';
        } else {
            bgMusic.play();
            musicToggleBtn.innerHTML = '🔇';
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

// Event Card Click Animation
document.querySelectorAll('.event').forEach(event => {
    event.addEventListener('click', function(e) {
        e.stopPropagation();
        // Remove active class from other events
        document.querySelectorAll('.event').forEach(el => {
            if (el !== this) {
                el.classList.remove('active');
            }
        });
        // Toggle active class on clicked event
        this.classList.toggle('active');
    });

    // Also handle keyboard activation
    event.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Close event cards when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.event')) {
        document.querySelectorAll('.event.active').forEach(el => {
            el.classList.remove('active');
        });
    }
});

