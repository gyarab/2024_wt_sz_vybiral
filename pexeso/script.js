const fruitCards = ['🍎', '🍊', '🍌', '🍓', '🍉', '🍍', '🍑', '🍒', '🍍', '🍋'];
const emojiCards = ['😀', '😎', '😂', '🥳', '😇', '🤩', '😡', '😭', '😱', '😴'];

let flippedCards = [];
let matchedCards = [];
let score = 0;
let totalPairs = 8; 
let cardSymbols = fruitCards;
function initializeGame() {
    score = 0;
    flippedCards = [];
    matchedCards = [];
    document.getElementById('score-value').textContent = score;

    totalPairs = parseInt(document.getElementById('pairs').value);
    const skin = document.getElementById('skin').value;
    cardSymbols = skin === 'emoji' ? emojiCards : fruitCards;

    const selectedCards = shuffle([...cardSymbols.slice(0, totalPairs), ...cardSymbols.slice(0, totalPairs)]);

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(totalPairs * 2))}, 100px)`;  // Dynamicky nastaví sloupce podle počtu karet

    selectedCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.setAttribute('data-symbol', symbol);  // Ukládá symbol pro zobrazení
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCardClick(e) {
    const card = e.target.closest('.card');
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);  // Pauza před kontrolou shody
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        score++;
        document.getElementById('score-value').textContent = score;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
    if (matchedCards.length === document.querySelectorAll('.card').length) {
        setTimeout(() => alert('Gratulujeme! Vyhráli jste!'), 500);
    }
}

document.getElementById('start-button').addEventListener('click', initializeGame);
document.getElementById('reset-button').addEventListener('click', initializeGame);

initializeGame();
