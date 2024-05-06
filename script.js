let words = [];
let currentIndex = 0;
let shownIndices = [];
let currentLanguage = 'de'; // Default language

document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            updateDisplay();
        });
});

function updateDisplay() {
    const wordElement = document.getElementById('wordText');
    const flagElement = document.getElementById('languageFlag');
    const word = words[currentIndex];

    if (currentLanguage === 'de') {
        wordElement.textContent = word.german;
        flagElement.textContent = '🇩🇪';
    } else {
        wordElement.textContent = word.english;
        flagElement.textContent = '🇺🇸';
    }
    resetCardState();
}

function nextCard() {
    if (shownIndices.length === words.length) shownIndices = [];
    do {
        currentIndex = Math.floor(Math.random() * words.length);
    } while (shownIndices.includes(currentIndex));
    shownIndices.push(currentIndex);
    updateDisplay();
}

function previousCard() {
    if (shownIndices.length > 1) {
        shownIndices.pop();
        currentIndex = shownIndices[shownIndices.length - 1];
        updateDisplay();
    }
}

function handleStarClick(event) {
    event.stopPropagation(); // Prevent card flip when clicking star
    words[currentIndex].count = (words[currentIndex].count || 0) + 1;
    updateStar();
}

function flipCard() {
    const card = document.querySelector('.card');
    card.classList.toggle('flip');
}

function resetCardState() {
    const starElement = document.querySelector('.star');
    starElement.textContent = words[currentIndex].count > 0 ? `⭐ ${words[currentIndex].count}` : '☆';
    document.querySelector('.card').classList.remove('flip'); // Reset flip state on new card
}

function setLanguage(lang) {
    currentLanguage = lang;
    updateDisplay();
}
