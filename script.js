
let words = [];
let currentIndex = 0;
let shownIndices = [];
let currentLanguage = 'de'; // Default language

// Load words from JSON
document.addEventListener('DOMContentLoaded', function() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            displayWord();
        });
});

// Set the language for displaying words
function setLanguage(lang) {
    currentLanguage = lang;
    displayWord();
}

// Display the current word based on the selected language
function displayWord() {
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
}

// Handle the 'Next' button click
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
}

// Handle the 'Previous' button click
function previousCard() {
    if (shownIndices.length > 1) {
        shownIndices.pop();  // Remove the last shown index
        currentIndex = shownIndices[shownIndices.length - 1];  // Move to the previous index
        displayWord();
    }
}

// Handle star click
function handleStarClick() {
    const starElement = document.querySelector('.star');
    const count = words[currentIndex].count = (words[currentIndex].count || 0) + 1;
    starElement.textContent = `⭐ ${count}`;
    nextCard();
}

// Flip the card to show the opposite language
function flipCard() {
    setLanguage(currentLanguage === 'de' ? 'en' : 'de');
}
