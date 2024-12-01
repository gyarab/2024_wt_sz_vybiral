const cards = [
    '😀', '😀', '😎', '😎',
    '😂', '😂', '🥳', '🥳',
    '😇', '😇', '🤩', '🤩',
    '😡', '😡', '😭', '😭'
];

let flippedCards = [];
let matchedCards = [];
let score = 0;

function initializeGame() {
    score = 0;
    flippedCards = [];
    matchedCards = [];
    document.getElementById('score-value').textContent = score;

    const shuffledCards = shuffle([...cards]);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
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
    const card = e.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
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
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('Gratulujeme! Vyhráli jste!'), 500);
    }
}

document.getElementById('reset-button').addEventListener('click', initializeGame);

initializeGame();