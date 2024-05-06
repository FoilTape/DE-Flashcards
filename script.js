let words = [];
let currentIndex = 0;
let shownIndices = [];
let currentLanguage = 'de'; // Default language

document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            displayWord();
            updateStar();
        });
});

function setLanguage(lang) {
    currentLanguage = lang;
    displayWord();
}

function displayWord() {
    const cardBody = document.querySelector('.card-body');
    const wordElement = document.getElementById('wordText');
    const flagElement = document.getElementById('languageFlag');
    const word = words[currentIndex];

    cardBody.classList.remove('flip'); // Reset flip animation

    if (currentLanguage === 'de') {
        wordElement.textContent = word.german;
        flagElement.textContent = '🇩🇪';
    } else {
        wordElement.textContent = word.english;
        flagElement.textContent = '🇺🇸';
    }
    setTimeout(() => cardBody.classList.add('flip'), 100); // Add flip animation
}

function nextCard() {
    if (shownIndices.length === words.length) {
        shownIndices = [];
    }
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * words.length);
    } while (shownIndices.includes(nextIndex));
    shownIndices.push(nextIndex);
    currentIndex = nextIndex;
    displayWord();
    updateStar();
}

function previousCard() {
    if (shownIndices.length > 1) {
        shownIndices.pop(); // Remove the last shown index
        currentIndex = shownIndices[shownIndices.length - 1]; // Move to the previous index
        displayWord();
        updateStar();
    }
}

function handleStarClick() {
    const starElement = document.querySelector('.star');
    words[currentIndex].count = (words[currentIndex].count || 0) + 1;
    updateStar();
    nextCard();
}

function updateStar() {
    const starElement = document.querySelector('.star');
    starElement.textContent = words[currentIndex].count > 0 ? `⭐ ${words[currentIndex].count}` : '☆';
}

function flipCard() {
    setLanguage(currentLanguage === 'de' ? 'en' : 'de');
}
