/* eslint-disable brace-style */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
function repeat (ele, n) {
    const array = [];
    for (let i = 0; i < n; i++) {
        array.push(ele)
    }
    return array;
}

function generateBoard (rows, cols, initialValue) {
    const sizeOfBoard = rows * cols;
    if (initialValue) {
        return repeat(initialValue, sizeOfBoard);
    }
    else {
        return repeat(" ", sizeOfBoard);
    }
}

function rowColToIndex (board, rowNumber, columnNumber) {
    const sizeOfBoard = Math.sqrt(board.length);
    return ((sizeOfBoard * rowNumber) + columnNumber);
}

function indexToRowCol (board, i) {
    const sizeOfBoard = Math.sqrt(board.length);
    const rowCol = {};
    rowCol.row = Math.floor(i / sizeOfBoard);
    rowCol.col = i % sizeOfBoard;
    return rowCol;
}

function setBoardCell (board, letter, row, col) {
    const newBoard = [...board];
    const indexToChange = rowColToIndex(board, row, col);
    newBoard[indexToChange] = letter;
    return newBoard;
}

function algebraicToRowCol (algebraicNotation) {
    if (algebraicNotation.length !== 2) {
        return undefined;
    }
    else if (algebraicNotation.includes(" ") || algebraicNotation.includes("/^[a-z0-9]+$/i")) {
        return undefined;
    }
    const algNot = algebraicNotation.split("");
    if (isNaN(algNot[1])) {
        return undefined;
    }
    const row = (Number(algNot[1]) - 1);
    const col = (algNot[0].charCodeAt(0) - 65);
    const indices = {};
    indices.col = col;
    indices.row = row;
    return indices;
}

function placeLetters (board, letter, ...algebraicNotation) {
    const cells = [];
    for (let i = 0; i < algebraicNotation.length; i++) {
        const indices = algebraicToRowCol(algebraicNotation[i]);
        cells.push(indices);
    }
    let newBoard = [...board];
    for (let j = 0; j < cells.length; j++) {
        newBoard = setBoardCell(newBoard, letter, cells[j].row, cells[j].col);
    }
    return newBoard;
}

function boardToString (board) {
    const sizeOfBoard = Math.sqrt(board.length);
    let fullBoard = "";
    let header = "  ";
    let cells = "  ";
    let rowCount = 1;
    for (let i = 0; i < sizeOfBoard; i++) {
        header += "  " + String.fromCodePoint(65 + i) + " ";
    }
    fullBoard += " " + header + " \n";
    for (let i = 0; i < sizeOfBoard; i++) {
        cells += "+---";
        if (i === sizeOfBoard - 1) {
            cells += "+";
        }
    }
    fullBoard += " " + cells + "\n";
    for (let i = 0; i < sizeOfBoard; i++) {
        fullBoard += " " + rowCount;
        for (let j = 0; j < sizeOfBoard; j++) {
            fullBoard += " | " + board[sizeOfBoard * i + j];
            if (j === sizeOfBoard - 1) {
                fullBoard += " |";
            }
        }
        fullBoard += "\n";
        fullBoard += " " + cells + "\n";
        rowCount++;
    }
    return fullBoard;
}

function isBoardFull (board) {
    var empty = function (cell) {
        return cell === " ";
    }
    return !board.some(empty);
}

function flip (board, row, col) {
    const sizeOfBoard = Math.sqrt(board.length);
    const newBoard = [...board];
    if (board[sizeOfBoard * row + col] === " ") {
        return board;
    }
    else if (board[sizeOfBoard * row + col] === "X") {
        newBoard[sizeOfBoard * row + col] = "O";
    }
    else {
        newBoard[sizeOfBoard * row + col] = "X";
    }
    return newBoard;
}

function flipCells (board, cellsToFlip) {
    let newBoard = [...board];
    for (let i = 0; i < cellsToFlip.length; i++) {
        const middle = cellsToFlip[i];
        for (let j = 0; j < middle.length; j++) {
            const inner = middle[j];
            newBoard = flip(newBoard, inner[0], inner[1])
        }
    }
    return newBoard;
}

function getCellsToFlip (board, lastRow, lastCol) {
    const toFlip = [];
    const sizeOfBoard = Math.sqrt(board.length);
    let currentIndex = lastRow * sizeOfBoard + lastCol;
    const piece = board[currentIndex];
    let accumulator = [];
    // Check up
    for (let i = 0; i < sizeOfBoard; i++) {
        let checker = (currentIndex - ((i + 1) * sizeOfBoard));
        if (checker < 0) {
            accumulator = [];
            break;
        }
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check down
    for (let i = 0; i < sizeOfBoard; i++) {
        let checker = (currentIndex + ((i + 1) * sizeOfBoard));
        if (checker >= board.length) {
            accumulator = [];
            break;
        }
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check right
    for (let i = 0; i < sizeOfBoard; i++) {
        let checker = currentIndex + (i + 1);
        if ((checker % sizeOfBoard) === 0) {
            accumulator = [];
            break;
        }
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check left
    for (let i = 0; i < sizeOfBoard; i++) {
        let checker = currentIndex - (i + 1);
        if ((checker % sizeOfBoard) === (sizeOfBoard - 1) || checker < 0) {
            accumulator = [];
            break;
        }
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check diagonal up right
    for (let i = 0; i < sizeOfBoard; i++) {
        if ((lastRow - (i + 1)) < 0 || (lastCol + (i + 1)) >= sizeOfBoard) {
            accumulator = [];
            break;
        }
        let checker = rowColToIndex(board, lastRow - (i + 1), lastCol + (i + 1));
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check diagonal down right
    for (let i = 0; i < sizeOfBoard; i++) {
        if ((lastRow + (i + 1)) >= (sizeOfBoard - 1) || (lastCol + (i + 1)) >= (sizeOfBoard - 1)) {
            accumulator = [];
            break;
        }
        let checker = rowColToIndex(board, lastRow + (i + 1), lastCol + (i + 1));
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check diagonal up left
    for (let i = 0; i < sizeOfBoard; i++) {
        if ((lastRow - (i + 1)) < 0 || (lastCol - (i + 1)) < 0) {
            accumulator = [];
            break;
        }
        let checker = rowColToIndex(board, lastRow - (i + 1), lastCol - (i + 1));
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    // Check diagonal down left
    for (let i = 0; i < sizeOfBoard; i++) {
        if ((lastRow + (i + 1)) >= sizeOfBoard || (lastCol - (i + 1)) < 0) {
            accumulator = [];
            break;
        }
        let checker = rowColToIndex(board, lastRow + (i + 1), lastCol - (i + 1));
        if (board[checker] === piece) {
            if (accumulator.length > 0) {
                toFlip.push(accumulator);
            }
            accumulator = [];
            break;
        }
        else if (board[checker] === " ") {
            accumulator = [];
            break;
        }
        else {
            let flipping = indexToRowCol(board, checker);
            accumulator.push([flipping.row, flipping.col]);
        }
    }
    return toFlip;
}

function isValidMove (board, letter, row, col) {
    let targetIndex = rowColToIndex(board, row, col);
    let newBoard = [...board];
    if (newBoard[targetIndex] !== " ") {
        return false;
    }
    else {
        newBoard[targetIndex] = letter;
        if (getCellsToFlip(newBoard, row, col).length > 0) {
            newBoard[targetIndex] = " ";
            return true;
        }
        else {
            newBoard[targetIndex] = " ";
            return false;
        }
    }
}

function isValidMoveAlgebraicNotation (board, letter, algebraicNotation) {
    let rowCol = algebraicToRowCol(algebraicNotation);
    return isValidMove(board, letter, rowCol.row, rowCol.col);
}

function getLetterCounts (board) {
    let count = {};
    count.X = 0;
    count.O = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "X") {
            count.X = count.X + 1;
            continue;
        }
        else if (board[i] === "O") {
            count.O = count.O + 1;
            continue;
        }
    }
    return count;
}

function getValidMoves (board, letter) {
    const validMoves = [];
    for (let i = 0; i < board.length; i++) {
        const testing = indexToRowCol(board, i);
        if (isValidMove(board, letter, testing.row, testing.col) && board[i] === " ") {
            validMoves.push([testing.row, testing.col]);
        }
    }
    return validMoves;
}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetters: placeLetters,
    boardToString: boardToString,
    isBoardFull: isBoardFull,
    flip: flip,
    flipCells: flipCells,
    getCellsToFlip: getCellsToFlip,
    isValidMove: isValidMove,
    isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
    getLetterCounts: getLetterCounts,
    getValidMoves: getValidMoves
}
