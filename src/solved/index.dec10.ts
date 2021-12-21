"use strict";
// tslint:disable
import fs = require('fs');
import { Stack } from 'typescript-collections';

const start = (): void => {
    // console.log(solve_dec_10_pt1());
    console.log(solve_dec_10_pt2());
};

module.exports = {
    start
};


const solve_dec_10_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec10.txt', 'utf8');
        const lines = data.split('\n');

        let score = 0;
        for(let i = 0; i < lines.length; i++){
            let illegal = validLine(lines[i]);
            if (illegal === '') continue;

            if (illegal === ')') score += 3;
            if (illegal === ']') score += 57;
            if (illegal === '}') score += 1197;
            if (illegal === '>') score += 25137;
        }

        return score;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

// Return the first illegal character (or '' if the line was legal)
const validLine = (input, returnStack = false) => {
    let inputStream = input.split('');
    let history = new Stack();
    while(inputStream.length > 0) {
        let oneChar = inputStream.shift();
        // openers are all approved
        if (oneChar === '(' || oneChar === '[' || oneChar === '{' || oneChar === '<'){
            history.push(oneChar);    
        } else {
            if (history.peek() === '(' && oneChar === ')') history.pop();
            else if (history.peek() === '[' && oneChar === ']') history.pop();
            else if (history.peek() === '{' && oneChar === '}') history.pop();
            else if (history.peek() === '<' && oneChar === '>') history.pop();
            else return oneChar;
        }
        // pull off the first, compare it to the top of the stack, move on
    }
    
    if (returnStack) return history;
    return '';
}


const solve_dec_10_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec10.txt', 'utf8');
        const lines = data.split('\n');

        let validLines = [];
        for(let i = 0; i < lines.length; i++){
            let illegal = validLine(lines[i]);
            if (illegal === '') validLines.push(lines[i]);
        }

        let scores = [];
        for(let i = 0; i < validLines.length; i++){
            let score = 0;
            let remainder = validLine(validLines[i], true);
            let fixerString = '';
            while (!remainder.isEmpty()) {
                score *= 5;
                let opener = remainder.pop();
                if (opener === '(') {
                    score += 1;
                    fixerString += ')';
                } else if (opener === '[') {
                    score += 2;
                    fixerString += ']';
                } else if (opener === '{') {
                    score += 3;
                    fixerString += '}';
                } else if (opener === '<') {
                    score += 4;
                    fixerString += '>';
                }
            }
            scores.push(score);
            console.log(validLines[i] + " | " + fixerString + '; Score: ' + score);
        }
        scores = scores.sort((a, b) => a < b ? -1 : 1);
        let center = scores[Math.floor(scores.length / 2)];
        return center;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



