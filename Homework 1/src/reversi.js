function repeat (ele, n) {
    const array = [];
    for (let i = 0; i < n; i++){
        array.push(ele);
    }
    return array;
} 
    
function generateBoard(rows, cols, initialValue) {
    const sizeOfBoard = rows * cols
    if(initialValue){
        return repeat(initialValue, sizeOfBoard);
    }
    else{
        return repeat(" ", sizeOfBoard);
    }
} 

function rowColToIndex(board, rowNumber, columnNumber) {
    const sizeOfBoard = Math.sqrt(board.length);
    return ((sizeOfBoard * rowNumber) + columnNumber);
}

function indexToRowCol(board, i) {
    const sizeOfBoard = Math.sqrt(board.length);
    const rowCol = {};
    rowCol.row = Math.floor(i / sizeOfBoard);
    rowCol.col = i % sizeOfBoard;
    return rowCol;
}

function setBoardCell(board, letter, row, col) {
    const newBoard = [...board];
    const sizeOfBoard = Math.sqrt(board.length);
    const indexToChange = ((sizeOfBoard * row) + col);
    newBoard[indexToChange] = letter;
    return newBoard;
}

function algebraicToRowCol(algebraicNotation) {
    if (algebraicNotation.length < 2 || algebraicNotation.length > 3){
        return undefined;
    }
    else if (algebraicNotation.includes(" ") || algebraicNotation.includes("/^[a-z0-9]+$/i")){
        return undefined;
    }
    const algNot = algebraicNotation.split("");
    for(let i = 0; i < algNot.length; i++){
        if(isNaN(algNot[i])){
            return undefined;
        }
    }
    const row = (Number(algNot[1]) - 1);
    const col = (algNot[0].charCodeAt(0) - 65);
    const indices = {};
    indices.col = col;
    indices.row = row;
    return indices;
}

function placeLetters(board, letter, ...algebraicNotation) {
    const cells = {};
    for (let i = 0; i < algebraicNotation.length; i++){
        const indices = algebraicToRowCol(algebraicNotation[i]);
        cells.push(indices);
    }
    const newBoard = [...board];
    for (let j = 0; j < cells.length; j++){
        newBoard = setBoardCell(newBoard, letter, cells[i].row, cells[i].col);
    }
    return newBoard;
}

function boardToString(board) {
    const sizeOfBoard = Math.sqrt(board.length);
    let fullBoard = "";
    let header = " ";
    let cells = "  ";
    let rowCount = 1;
    for (let i = 0; i < sizeOfBoard; i++){
        header += "  " + String.fromCodePoint(65 + i) + " ";
    }
    fullBoard += " " + header + "\n";
    for (let i = 0; i < sizeOfBoard; i++){
        cells += "+---";
        if(i === sizeOfBoard - 1){
            cells += "+";
        }
    }
    fullBoard += cells + "\n";
    for (let i = 0; i < sizeOfBoard; i++){
        fullBoard += rowCount;
        for (let j = 0; j < sizeOfBoard; j++){
            fullBoard += " | " + board[sizeOfBoard * i + j];
            if(j === sizeOfBoard - 1){
                fullBoard += " |";
            }
        }
        fullBoard += "\n";
        fullBoard += cells + "\n";
        rowCount++;
    }
    return fullBoard;
}

function isBoardFull(board) {
    var empty = function(cell){
        return cell === " ";
    }
    return board.some(empty);
}

function flip(board, row, col) {
    const sizeOfBoard = Math.sqrt(board.length);
    const newBoard = [...board];
    if (board[sizeOfBoard * row + col] === " "){
        return board;
    }
    else if (board[sizeOfBoard * row + col] === "X"){
        newBoard[sizeOfBoard * row + col] = "O";
    }
    else {
        newBoard[sizeOfBoard * row + col] = "X";
    }
    return newBoard;
}

function flipCells(board, cellsToFlip) {
    const newBoard = [...board];
    for (let i = 0; i < cellsToFlip.length; i++){
        const middle = cellsToFlip[i];
        for (let j = 0; j < middle.length; j++){
            const inner = middle[j];
            newBoard = flip(newBoard, inner[0], inner[1])
        }
    }
    return newBoard;
}

function getCellsToFlip(board, lastRow, lastCol) {
    const toFlip = [];
    const sizeOfBoard = Math.sqrt(board.length);
    let currentIndex = lastRow * sizeOfBoard + lastCol;
    const piece = board[currentIndex];
    let count = 0;
    for (let i = 0; i < sizeOfBoard; i++){
        
    }
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
    getCellsToFlip: getCellsToFlip
}