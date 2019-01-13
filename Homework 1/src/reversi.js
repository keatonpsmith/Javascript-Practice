function repeat(ele, n) {
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
    const rowColumn = {};
    rowCol.row = Math.floor(i / sizeOfBoard);
    rowCol.col = i % sizeOfBoard;
    return rowCol;
}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    // ...
}