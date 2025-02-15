const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');

function createBoard() {
    boardElement.innerHTML = '';
    board = [];
    for (let row = 0; row < ROWS; row++) {
        const rowArray = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => dropDisc(col));
            boardElement.appendChild(cell);
            rowArray.push(cell);
        }
        board.push(rowArray);
    }
    updateStatus();
}

function dropDisc(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col].classList.contains('red') && !board[row][col].classList.contains('yellow')) {
            board[row][col].classList.add(currentPlayer);
            if (checkWin(row, col)) {
                alert(`${currentPlayer.toUpperCase()} wins!`);
                statusElement.textContent = `${currentPlayer.toUpperCase()} wins!`;
                boardElement.style.pointerEvents = 'none';
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                updateStatus();
            }
            return;
        }
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || 
           checkDirection(row, col, 0, 1) || 
           checkDirection(row, col, 1, 1) || 
           checkDirection(row, col, 1, -1);  
}

function checkDirection(row, col, rowInc, colInc) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowInc;
        const c = col + i * colInc;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c].classList.contains(currentPlayer)) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function updateStatus() {
    statusElement.textContent = `${currentPlayer.toUpperCase()}'s turn`;
}

restartButton.addEventListener('click', () => {
    createBoard();
    currentPlayer = 'red';
    boardElement.style.pointerEvents = 'auto';
});

createBoard();
