let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = '2p'; // '1p' or '2p'

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const modeSelection = document.getElementById('mode-selection');
const gameContent = document.getElementById('game-content');
const onePlayerBtn = document.getElementById('one-player');
const twoPlayerBtn = document.getElementById('two-player');
const backToMenuBtn = document.getElementById('back-to-menu');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame(mode) {
    gameMode = mode;
    modeSelection.style.display = 'none';
    gameContent.style.display = 'block';
    handleRestartGame();
}

function backToMenu() {
    modeSelection.style.display = 'flex';
    gameContent.style.display = 'none';
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive || (gameMode === '1p' && currentPlayer === 'O')) {
        return;
    }

    makeMove(clickedCell, clickedCellIndex);

    if (gameActive && gameMode === '1p' && currentPlayer === 'O') {
        setTimeout(botMove, 500);
    }
}

function makeMove(cell, index) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    if (checkWinner()) {
        statusDisplay.innerText = `Player ${currentPlayer} has won!`;
        gameActive = false;
        triggerCelebration();
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function triggerCelebration() {
    if (typeof confetti !== 'function') {
        return;
    }

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function botMove() {
    if (!gameActive) return;
    
    // Simple AI: Random available move
    const availableMoves = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if (availableMoves.length > 0) {
        const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
        makeMove(cell, randomIndex);
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerText = "Player X's Turn";
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);
onePlayerBtn.addEventListener('click', () => startGame('1p'));
twoPlayerBtn.addEventListener('click', () => startGame('2p'));
backToMenuBtn.addEventListener('click', backToMenu);
