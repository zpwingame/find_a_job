// Tic-tac-toe implementation using vanilla JavaScript, HTML and CSS.
// Create the game board
const board = document.createElement('div');
board.id = 'board';
document.body.appendChild(board);

// Create cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    board.appendChild(cell);
}

// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Handle cell click
board.addEventListener('click', (e) => {
    const cell = e.target;
    if (cell.className === 'cell' && gameActive) {
        const index = cell.dataset.index;
        if (gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                endGame(`${currentPlayer} wins!`);
            } else if (gameBoard.every(cell => cell !== '')) {
                endGame("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
});

// Check for win
function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => gameBoard[index] === currentPlayer);
    });
}

// End game
function endGame(message) {
    gameActive = false;
    setTimeout(() => {
        alert(message);
        resetGame();
    }, 100);
}

// Reset game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

// Add CSS styles
const styles = `
    #board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-gap: 5px;
        margin: 20px auto;
        width: 310px;
    }
    .cell {
        width: 100px;
        height: 100px;
        background: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 48px;
        cursor: pointer;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
