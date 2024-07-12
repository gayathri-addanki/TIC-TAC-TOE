document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseButton = document.getElementById('modal-close');

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent) {
                cell.textContent = currentPlayer;
                if (checkWin()) {
                    markWinningCells();
                    showModal(`Player ${currentPlayer} wins!`);
                    resetBoard();
                } else if (isBoardFull()) {
                    showModal("It's a tie!");
                    resetBoard();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    modalCloseButton.addEventListener('click', hideModal);

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function isBoardFull() {
        return Array.from(cells).every(cell => cell.textContent !== '');
    }

    function markWinningCells() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
            }
        });
    }

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        currentPlayer = 'X';
    }
});
