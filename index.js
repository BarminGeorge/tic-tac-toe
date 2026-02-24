const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

currentPlayer = CROSS;
currentStep = 1;

const container = document.getElementById('fieldWrapper');

const FIELD = [-1, -1, -1, -1, -1, -1, -1, -1, -1]

function check_winner(){
    const rows = check_rows()
    if (rows[0])
        return rows;
    const column = check_columns()
    if (rows[0]){
        return column;
    }
    const diagonal = check_diagonal()
    if (diagonal[0]){
        return diagonal;
    }
    return false;
}

function check_rows(){
    for (let i = 0; i < 3; i++) {
        if (FIELD[i * 3] === FIELD[i * 3 + 1] && FIELD[i ** 3] === FIELD[i * 3 + 2])
            return [true, i * 3, i * 3 + 1, i * 3 + 2];
    }
    return [false, -1, -1, -1];
}

function check_columns(){
    for (let i = 0; i < 3; i++){
        if (FIELD[i] === FIELD[i + 3] === FIELD[i + 6]){
            return true;
        }
    }
    return false;
}

function check_diagonal() {
    for (let i = 0; i < 2; i++){

    }
}

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
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

function cellClickHandler (row, col) {
    // Пиши код тут
    //console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
    switch (currentPlayer) {
        case CROSS:
            renderSymbolInCell(CROSS, row, col);
            currentPlayer = ZERO;
            fillField(row, col, CROSS)
            break;
        case ZERO:
            renderSymbolInCell(ZERO, row, col);
            currentPlayer = CROSS;
            fillField(row, col, ZERO)
            break;
    }

    currentStep++;

    if (currentStep > 9){
        alert("Победила дружба")
    }
}

function indexByRowsAndCols (row, col){
    return 3 * row + col;
}

function fillField(row, col, symbol){
    FIELD[indexByRowsAndCols(row, col)] = symbol;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    //console.log('reset!');
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            symbol = FIELD[indexByRowsAndCols(row, col)];
            renderSymbolInCell(symbol, row, col, color = '#FFF');
            fillField(row, col, -1);
        }
    }
}


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
