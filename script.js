const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementsByClassName('close')[0];

const imageSources = [
    'A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpg',
    'A6.jpg', 'A7.jpg', 'A8.jpg', 'A9.jpg', 'AB1.jpg',
    'B1.jpg', 'B2.jpg', 'B3.jpg', 'B4.jpg', 'B5.jpg',
    'B6.jpg', 'B7.jpg'
];
imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
});

function updateCarousel() {
    const angle = (currentIndex / carouselItems.length) * 360;
    carouselItems.forEach((item, index) => {
        const itemAngle = (index / carouselItems.length) * 360 - angle;
        item.style.transform = `rotateY(${itemAngle}deg) translateZ(1200px)`;
    });
}

function navigateCarousel(direction) {
    if (direction === 'left') {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    } else if (direction === 'right') {
        currentIndex = (currentIndex + 1) % carouselItems.length;
    }
    updateCarousel();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        navigateCarousel('left');
    } else if (event.key === 'ArrowRight') {
        navigateCarousel('right');
    }
});

leftArrow.addEventListener('click', () => navigateCarousel('left'));
rightArrow.addEventListener('click', () => navigateCarousel('right'));

document.querySelectorAll('.view-full-button').forEach(button => {
    button.addEventListener('click', function() {
        const item = button.closest('.carousel-item');
        modal.style.display = 'flex';
        modalImg.src = item.querySelector('img').src;
        modalTitle.textContent = item.querySelector('h3').textContent;
        modalDescription.textContent = item.querySelector('p').textContent;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

let startX;
let startY;
let isDragging = false;

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    isDragging = true;
});

document.addEventListener('touchmove', function(event) {
    if (!isDragging) return;
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const dx = x - startX;
    const dy = y - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            navigateCarousel('right');
        } else {
            navigateCarousel('left');
        }
        isDragging = false;
    }
});

document.addEventListener('touchend', function() {
    isDragging = false;
});

// Ensure the modal is closed when the page loads
window.addEventListener('load', () => {
    modal.style.display = 'none';
});

updateCarousel();