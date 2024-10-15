const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
let someoneWon = false;
const statusMessage = document.getElementById('statusMessage');

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (someoneWon) return;
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        
        if (checkWin(currentPlayer)) {
            someoneWon = true;
            statusMessage.textContent = `Game over! ${currentPlayer} wins!`;
            return;
        }
        
        if (checkTie()) {
            someoneWon = true;
            statusMessage.textContent = `Game is tied!`;
            return;
        }
        
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        statusMessage.textContent = `${currentPlayer}'s turn!`;
    });
}

function checkWin(currentPlayer) {
    return winning_combinations.some(combination => {
        return combination.every(index => squares[index].textContent === currentPlayer);
    });
}

function checkTie() {
    return [...squares].every(square => square.textContent !== '');
}

function restartButton() {
    someoneWon = false;
    [...squares].forEach(square => square.textContent = "");
    currentPlayer = players[0];
    statusMessage.textContent = `${currentPlayer}'s turn!`;
}
