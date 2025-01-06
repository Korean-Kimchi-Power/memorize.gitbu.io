let flashcards = [];
let currentIndex = 0;
let showEnglishFirst = false;

const createCardBtn = document.getElementById('createCardBtn');
const flashcardWrapper = document.getElementById('flashcardWrapper');
const cardCount = document.getElementById('cardCount');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipLanguageBtn = document.getElementById('flipLanguageBtn');

// Function to create a flashcard
function createFlashcard(koreanWord, englishWord) {
    const flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');

    const front = document.createElement('div');
    front.classList.add('front');
    front.innerText = koreanWord;

    const back = document.createElement('div');
    back.classList.add('back');
    back.innerText = englishWord;

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';

    // Add the delete button to the flashcard
    flashcard.appendChild(deleteBtn);
    flashcard.appendChild(front);
    flashcard.appendChild(back);

    // Add event listener to the delete button
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent triggering the flip event
        deleteFlashcard(flashcard);  // Call the function to delete the card
    });

    // Add event listener for flipping the card
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flip'); // Flip the card when clicked
    });

    // Add flashcard to the array and the wrapper
    flashcards.push(flashcard);
    flashcardWrapper.appendChild(flashcard);

    updateCardCount();  // Update the flashcard count
    showCurrentCard();  // Show the first card initially
}

// Function to update the number of cards
function updateCardCount() {
    cardCount.innerText = flashcards.length;
}

// Function to show the current flashcard
function showCurrentCard() {
    if (flashcards.length === 0) return; // Exit if there are no flashcards

    const visibleCard = flashcards[currentIndex];

    // Hide all flashcards
    flashcards.forEach(card => card.style.display = 'none');

    // Show the current one
    visibleCard.style.display = 'block';

    // Disable or enable navigation buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === flashcards.length - 1;
}

// Function to delete a flashcard
function deleteFlashcard(card) {
    // Remove the card from the DOM
    flashcardWrapper.removeChild(card);

    // Remove the card from the flashcards array
    const index = flashcards.indexOf(card);
    if (index !== -1) {
        flashcards.splice(index, 1);
    }

    // Update the card count and show the next card
    updateCardCount();
    if (flashcards.length > 0) {
        currentIndex = Math.min(currentIndex, flashcards.length - 1);
        showCurrentCard();
    } else {
        cardCount.innerText = 0;
    }
}

// Event listener for creating a new card
createCardBtn.addEventListener('click', () => {
    const koreanWord = prompt('Enter the Korean word:');
    const englishWord = prompt('Enter the English word:');
    if (koreanWord && englishWord) {
        createFlashcard(koreanWord, englishWord);
    }
});

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showCurrentCard();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        showCurrentCard();
    }
});

// Flip language button
flipLanguageBtn.addEventListener('click', () => {
    showEnglishFirst = !showEnglishFirst;
    
    flashcards.forEach(card => {
        const front = card.querySelector('.front');
        const back = card.querySelector('.back');

        // Swap the content of the front and back based on the toggle state
        if (showEnglishFirst) {
            const temp = front.innerText;
            front.innerText = back.innerText;
            back.innerText = temp;
        } else {
            const temp = front.innerText;
            front.innerText = back.innerText;
            back.innerText = temp;
        }

        // After switching the content, check if the card is flipped, and preserve its state
        if (card.classList.contains('flip')) {
            card.classList.remove('flip');  // Remove the flip
            card.classList.add('flip');  // Add the flip again to ensure the right content is showing
        }
    });

    // Reset the current card display after flipping language
    showCurrentCard();
});

// Initialize first view by hiding all cards initially
showCurrentCard();
