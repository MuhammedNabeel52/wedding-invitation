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

// Curtain Auto-Open
const curtain = document.getElementById('curtain');
const heroCard = document.getElementById('hero-card');

function openCurtain() {
    curtain.classList.add('open');
    setTimeout(() => {
        curtain.style.display = 'none';
        heroCard.style.opacity = '1';
    }, 1000);
}

// Auto-open after 3 seconds
setTimeout(openCurtain, 3000);

// Scratch Off Functionality
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');
const dateCard = document.getElementById('date-card');

function resizeCanvas() {
    canvas.width = dateCard.offsetWidth;
    canvas.height = dateCard.offsetHeight;
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isDrawing = false;

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

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