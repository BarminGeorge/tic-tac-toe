const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let currentPlayer = CROSS;
let currentStep = 1;
let gameEnded = false;

const container = document.getElementById('fieldWrapper');
const FIELD = new Array(9).fill(-1);

function checkRows() {
    for (let i = 0; i < 3; i++) {
        const idx = i * 3;
        if (FIELD[idx] !== -1 && FIELD[idx] === FIELD[idx + 1] && FIELD[idx] === FIELD[idx + 2]) {
            return [true, idx, idx + 1, idx + 2];
        }
    }
    return [false, -1, -1, -1];
}

function checkColumns() {
    for (let i = 0; i < 3; i++) {
        if (FIELD[i] !== -1 && FIELD[i] === FIELD[i + 3] && FIELD[i] === FIELD[i + 6]) {
            return [true, i, i + 3, i + 6];
        }
    }
    return [false, -1, -1, -1];
}

function checkDiagonals() {
    if (FIELD[0] !== -1 && FIELD[0] === FIELD[4] && FIELD[0] === FIELD[8]) {
        return [true, 0, 4, 8];
    }
    if (FIELD[2] !== -1 && FIELD[2] === FIELD[4] && FIELD[2] === FIELD[6]) {
        return [true, 2, 4, 6];
    }
    return [false, -1, -1, -1];
}

function checkWinner() {
    const rows = checkRows();
    if (rows[0]) return rows;
    const cols = checkColumns();
    if (cols[0]) return cols;
    const diags = checkDiagonals();
    if (diags[0]) return diags;
    return [false, -1, -1, -1];
}

function indexByRowCol(row, col) {
    return row * 3 + col;
}

function fillField(row, col, symbol) {
    FIELD[indexByRowCol(row, col)] = symbol;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const cell = findCell(row, col);
    if (cell) {
        cell.textContent = symbol;
        cell.style.color = color;
    }
}

function highlightWinningCells(indices) {
    for (let i = 1; i <= 3; i++) {
        const idx = indices[i];
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        renderSymbolInCell(FIELD[idx], row, col, 'red');
    }
}

function cellClickHandler(row, col) {
    if (gameEnded) return;

    const index = indexByRowCol(row, col);
    if (FIELD[index] !== -1) return;

    renderSymbolInCell(currentPlayer, row, col);
    fillField(row, col, currentPlayer);

    const winnerInfo = checkWinner();
    if (winnerInfo[0]) {
        gameEnded = true;
        highlightWinningCells(winnerInfo);
        alert(`Победил ${currentPlayer}!`);
        return;
    }

    if (currentStep >= 9) {
        gameEnded = true;
        alert('Победила дружба!');
        return;
    }

    currentPlayer = (currentPlayer === CROSS) ? ZERO : CROSS;
    currentStep++;
}

// ---- Сброс игры ----
function resetClickHandler() {
    // Очистить массив поля
    FIELD.fill(-1);
    // Сбросить состояние игры
    currentPlayer = CROSS;
    currentStep = 1;
    gameEnded = false;

    // Перерисовать все клетки пустыми
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            renderSymbolInCell(EMPTY, row, col, '#333');
        }
    }
}

// ---- Инициализация и слушатели ----
function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

// Запуск игры
startGame();
addResetListener();

/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
