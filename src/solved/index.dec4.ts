"use strict";
// tslint:disable
import fs = require('fs');
import _ = require('lodash');

const start = (): void => {
    // console.log(solve_dec_4_pt1());
    console.log(solve_dec_4_pt2());
};

module.exports = {
    start
};


const solve_dec_4_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec4.txt', 'utf8');
        const lines = data.split('\n');

        let numSequence = lines.shift().split(',');
        lines.shift();

        let rawBoards = [];
        let currentBoard = [];
        for(let i = 0; i < lines.length; i++){
            if (lines[i] === '') {
                rawBoards.push(currentBoard);
                currentBoard = [];
            } else {
                currentBoard.push(lines[i].trim().replace('  ', ' ').split(' ').filter(o => o !== ''));
            }
        }
        rawBoards.push(currentBoard);
        // Only care about rows and columns, so compute each possible winning combination for each board
        let boards = [];
        for(let i = 0; i < rawBoards.length; i++){
            let board = { numbers: new Set(), winners: []};
            // Winning rows
            for(let j = 0; j < rawBoards[i].length; j++) {
                let winner = new Set();
                rawBoards[i][j].forEach(o => winner.add(o));
                rawBoards[i][j].forEach(o => board.numbers.add(o));
                board.winners.push(winner);
            }
            // Winning columns
            for(let j = 0; j < rawBoards[0][0].length; j++) {  // 0....4
                let winner = new Set();
                for(let k = 0; k < rawBoards[i].length; k++){
                    winner.add(rawBoards[i][k][j]);
                }
                board.winners.push(winner);
            }
            boards.push(board);
        }

        let called = new Set();
        let winner = false;
        let winningBoards = [];
        let lastNumber = 0;
        while (!winner){
            let number = numSequence.shift();
            lastNumber = parseInt(number);
            called.add(number);
            for(let i = 0; i < boards.length; i++){
                for(let j = 0; j < boards[i].winners.length; j++){
                    // if set minus called is empty, set is a winner
                    let check = Array.from(boards[i].winners[j].values()).filter(o => !called.has(o));
                    if (check.length === 0) {
                        winner = true;
                        winningBoards.push(boards[i]);
                    }
                }
            }

            if (numSequence.length === 0){
                console.log(" No Winner!  Error! ");
                console.log(called);
                break;
            }
        }
        
        console.log("Number of winning boards: " + winningBoards.length);
        let winningBoard = winningBoards[0];
        let uncalled = Array.from(winningBoard.numbers).filter(o => !called.has(o)).map(o => parseInt(o as string));
        let sum = 0;
        uncalled.forEach(o => sum += o);
        console.log(sum);
        console.log(lastNumber);
        

        return sum * lastNumber;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_4_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec4.txt', 'utf8');
        const lines = data.split('\n');

        let numSequence = lines.shift().split(',');
        lines.shift();

        let rawBoards = [];
        let currentBoard = [];
        for(let i = 0; i < lines.length; i++){
            if (lines[i] === '') {
                rawBoards.push(currentBoard);
                currentBoard = [];
            } else {
                currentBoard.push(lines[i].trim().replace('  ', ' ').split(' ').filter(o => o !== ''));
            }
        }
        rawBoards.push(currentBoard);
        // Only care about rows and columns, so compute each possible winning combination for each board
        let boards = [];
        for(let i = 0; i < rawBoards.length; i++){
            let board = { numbers: new Set(), winners: [], hasWon: false};
            // Winning rows
            for(let j = 0; j < rawBoards[i].length; j++) {
                let winner = new Set();
                rawBoards[i][j].forEach(o => winner.add(o));
                rawBoards[i][j].forEach(o => board.numbers.add(o));
                board.winners.push(winner);
            }
            // Winning columns
            for(let j = 0; j < rawBoards[0][0].length; j++) {  // 0....4
                let winner = new Set();
                for(let k = 0; k < rawBoards[i].length; k++){
                    winner.add(rawBoards[i][k][j]);
                }
                board.winners.push(winner);
            }
            boards.push(board);
        }

        let called = new Set();
        let winner = false;
        let winningBoards = [];
        let lastNumber = 0;
        while (true){
            if (boards.filter(o => !o.hasWon).length === 0){
                // every board a winner!
                break;
            }

            if (numSequence.length === 0){
                // ran out of numbers!
                console.log(" No Winner!  Error! ");
                console.log(called);
                break;
            }

            let number = numSequence.shift();
            lastNumber = parseInt(number);
            called.add(number);
            winningBoards = [];

            for(let i = 0; i < boards.length; i++) {
                if (boards[i].hasWon) continue;
                for(let j = 0; j < boards[i].winners.length; j++){
                    // if set minus called is empty, set is a winner
                    let check = Array.from(boards[i].winners[j].values()).filter(o => !called.has(o));
                    if (check.length === 0) {
                        boards[i].hasWon = true;
                        winningBoards.push(boards[i]);
                    }
                }
            }

        }
        
        console.log("Number of last-number-winning boards: " + winningBoards.length);
        let winningBoard = winningBoards[0];
        let uncalled = Array.from(winningBoard.numbers).filter(o => !called.has(o)).map(o => parseInt(o as string));
        let sum = 0;
        uncalled.forEach(o => sum += o);
        console.log(sum);
        console.log(lastNumber);
        

        return sum * lastNumber;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



