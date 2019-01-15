/* eslint-disable brace-style */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable semi */
var rev = require('./reversi.js');
var readlineSync = require('readline-sync');
var fs = require('fs');

console.log("REVERSI");

if (process.argv[2]) {
    fs.readFile('myconfig.json', 'utf8', function (err, data) {
        if (err) {
            console.log("UH OH", err);
        }
        else {
            let object = JSON.parse(data);
            let board = [];
            const computerLetter = object.boardPreset.playerLetter === 'X' ? 'O' : 'X';
            const playerLetter = object.boardPreset.playerLetter;
            if (object.boardPreset.board) {
                board = [...object.boardPreset.board];
            }
            if (object.scriptedMoves.player) {
                for (let i = 0; i < object.scriptedMoves.player.length; i++) {
                    const indices = rev.algebraicToRowCol(object.scriptedMoves.player[i]);
                    board = rev.setBoardCell(board, playerLetter, indices.row, indices.col);
                }
            }
            if (object.scriptedMoves.computer) {
                for (let i = 0; i < object.scriptedMoves.computer.length; i++) {
                    const indices = rev.algebraicToRowCol(object.scriptedMoves.computer[i]);
                    board = rev.setBoardCell(board, computerLetter, indices.row, indices.col);
                }
            }
            while (!rev.isBoardFull(board)) {
                console.log("Player is ", playerLetter);
                console.log(rev.boardToString(board));
                if (rev.getValidMoves(board, playerLetter).length > 0) {
                    let currentPlayerMove = readlineSync.question("Enter your move: ");
                    let indices = rev.algebraicToRowCol(currentPlayerMove);
                    console.log(indices);
                    while (!rev.isValidMove(board, playerLetter, indices.row, indices.col)) {
                        console.log('Invalid move. Your move should: \n * Be in format \n * specify an existing empty cell \n * flip at least one of the oppose piece');
                        currentPlayerMove = readlineSync.question('Enter your move: ');
                        indices = rev.algebraicToRowCol(currentPlayerMove);
                        console.log(indices);
                    }
                    board = rev.placeLetters(board, playerLetter, currentPlayerMove);
                    console.log(rev.boardToString(board));
                    if (rev.isBoardFull(board)) {
                        break;
                    }
                }
                let possibleMoves = rev.getValidMoves(board, computerLetter);
                if (possibleMoves.length > 0) {
                    let random = Math.floor(Math.random() * (+possibleMoves.length - +0)) + +0;
                    board = rev.setBoardCell(board, computerLetter, possibleMoves[random].row, possibleMoves[random].col);
                }
                if (possibleMoves.length < 1 && rev.getValidMoves(board, playerLetter).length < 1) {
                    break;
                }
            }
            const count = rev.getLetterCounts(board);
            console.log("X Score: ", count.X);
            console.log("O Score: ", count.O);
            if (count.X > count.O) {
                console.log("X Wins!");
            }
            else if (count.X === count.O) {
                console.log("Tie!");
            }
            else {
                console.log("O Wins!");
            }
        }
    });
}
else {
    let board = [];
    let boardWidth = readlineSync.question("Please specify the width of the board (4 - 26 inclusive): ");
    console.log(boardWidth);
    while (isNaN(boardWidth) || boardWidth < 4 || boardWidth > 26 || boardWidth % 2 !== 0) {
        boardWidth = readlineSync.question("Please specify the width of the board (4 - 26 inclusive): ");
        console.log(boardWidth);
    }
    let playerLetter = readlineSync.question("Please select your piece X or O: ");
    console.log(playerLetter);
    while (playerLetter !== "X" && playerLetter !== "O") {
        playerLetter = readlineSync.question("Please select your piece X or O: ");
        console.log(playerLetter);
    }
    const computerLetter = playerLetter === "X" ? "O" : "X";
    board = rev.generateBoard(boardWidth, boardWidth);
    board = rev.setBoardCell(board, "X", boardWidth / 2 - 1, boardWidth / 2);
    board = rev.setBoardCell(board, "X", boardWidth / 2, boardWidth / 2 - 1);
    board = rev.setBoardCell(board, "O", boardWidth / 2 - 1, boardWidth / 2 - 1);
    board = rev.setBoardCell(board, "O", boardWidth / 2, boardWidth / 2);
    while (!rev.isBoardFull(board)) {
        console.log("Player is ", playerLetter);
        console.log(rev.boardToString(board));
        if (rev.getValidMoves(board, playerLetter).length > 0) {
            let currentPlayerMove = readlineSync.question("Enter your move: ");
            let indices = rev.algebraicToRowCol(currentPlayerMove);
            console.log(indices);
            while (!rev.isValidMove(board, playerLetter, indices.row, indices.col)) {
                console.log('Invalid move. Your move should: \n * Be in format \n * specify an existing empty cell \n * flip at least one of the oppose piece');
                currentPlayerMove = readlineSync.question('Enter your move: ');
                indices = rev.algebraicToRowCol(currentPlayerMove);
                console.log(indices);
            }
            board = rev.placeLetters(board, playerLetter, currentPlayerMove);
            console.log(rev.boardToString(board));
            if (rev.isBoardFull(board)) {
                break;
            }
        }
        let possibleMoves = rev.getValidMoves(board, computerLetter);
        if (possibleMoves.length > 0) {
            let random = Math.floor(Math.random() * (+possibleMoves.length - +0)) + +0;
            board = rev.setBoardCell(board, computerLetter, possibleMoves[random].row, possibleMoves[random].col);
        }
        if (possibleMoves.length < 1 && rev.getValidMoves(board, playerLetter).length < 1) {
            break;
        }
    }
    const count = rev.getLetterCounts(board);
    console.log("X Score: ", count.X);
    console.log("O Score: ", count.O);
    if (count.X > count.O) {
        console.log("X Wins!");
    }
    else if (count.X === count.O) {
        console.log("Tie!");
    }
    else {
        console.log("O Wins!");
    }
}
