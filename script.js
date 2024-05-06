let words = [];
let currentIndex = 0;
let shownIndices = [];
let currentLanguage = 'de'; // Default language setting

document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            updateDisplay();
        });
});

function setLanguage(lang) {
    currentLanguage = lang;
    updateDisplay();
}

function updateDisplay() {
    const wordElement = document.getElementById('wordText');
    const translationElement = document.getElementById('translationText');
    const flagElement = document.getElementById('languageFlag');
    const word = words[currentIndex];

    if (currentLanguage === 'de') {
        wordElement.textContent = word.german;
        translationElement.textContent = word.english;
        flagElement.textContent = '🇩🇪';
    } else {
        wordElement.textContent = word.english;
        translationElement.textContent = word.german;
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
    event.stopPropagation(); // Prevent card flip when clicking the star
    words[currentIndex].count = (words[currentIndex].count || 0) + 1;
    updateStar();
}

function flipCard() {
    const cardInner = document.querySelector('.card-inner');
    cardInner.classList.toggle('flip');
}

function updateStar() {
    const starElement = document.querySelector('.star');
    starElement.textContent = words[currentIndex].count > 0 ? `⭐ ${words[currentIndex].count}` : '☆';
}

function resetCardState() {
    const cardInner = document.querySelector('.card-inner');
    cardInner.classList.remove('flip'); // Reset flip state on new card
}
