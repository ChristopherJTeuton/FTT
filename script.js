const carousel = document.querySelector('.carousel');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
let currentIndex = Math.floor(carouselItems.length / 2); // Start with the middle item
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementsByClassName('close')[0];

// Shuffle the carousel items
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Randomize painting order
function randomizePaintings() {
    const shuffledItems = shuffle(carouselItems);
    carousel.innerHTML = '';
    shuffledItems.forEach(item => carousel.appendChild(item));
}

function updateCarousel() {
    const offset = -currentIndex * 100 / 3; // Adjust for three items visible
    carousel.style.transform = `translateX(${offset}%)`;
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

// Randomize paintings on load and update carousel
window.addEventListener('load', () => {
    randomizePaintings();
    updateCarousel();
    modal.style.display = 'none';
});