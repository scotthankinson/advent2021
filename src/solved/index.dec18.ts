"use strict";
// tslint:disable
import fs = require('fs');
import { max } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_18_pt1());
    console.log(solve_dec_18_pt2());
};

module.exports = {
    start
};


const solve_dec_18_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec18.txt', 'utf8');

        const lines = data.split('\n');
        // [[[[1,1],[2,2]],[3,3]],[4,4]]
        // [[[[1,1],[2,2]],[3,3]],[4,4]]

        // [[[[3,0],[5,3]],[4,4]],[5,5]]
        // [[[[3,0],[5,3]],[4,4]],[5,5]]
        
        // [[[[5,0],[7,4]],[5,5]],[6,6]]
        // [[[[5,0],[7,4]],[5,5]],[6,6]]


        // [[[5,7],[7,0]],[[7,[7,0]],[[8,7],[7,6]]]]
        // [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]



        // let left = '[[[[4,3],4],4],[7,[[8,4],9]]]';
        // let right = '[1,1]';
        
        let combine = lines[0];
        for(let i = 1; i < lines.length; i++){
            combine = '[' + combine + ',' + lines[i] + ']';
            console.log("Simplifying " + combine);

            while(true) {
                let test = simplify(combine);
                console.log(test === "DONE!");
                if (test === 'DONE!') {
                    break;
                } else {
                    combine = test;
                    console.log(combine);
                }
            }
        }
       
        console.log(combine);
        // TODO: Implement Magnitude because this problem never ends
        while(combine.indexOf("[") >= 0) {
            console.log("IN: " + combine.length);
            console.log("IN: " + combine);
            combine = reduce(combine);
            console.log("OUT: " + combine.length);
            console.log("OUT: " + combine);
        }

        console.log(combine);
        return parseInt(combine);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const simplify = (input) => {
    let combine = input;
    let openIndexes = [];
    let opens = combine.split('[');
    let pos = 0;
    for(let i = 0; i < opens.length; i++){
        pos += opens[i].length;
        openIndexes.push(pos);
        pos += 1;
    }
    openIndexes.pop();

    let depths = [];
    let globalDepth = 0;
    for(let i = 0; i < combine.length; i++) {
        if (combine[i] === '[') {
            globalDepth += 1;
            depths.push(globalDepth);
        } else if (combine[i] === ']') globalDepth -= 1;
    }
    
    let segments = [];
    for(let j = 0; j < openIndexes.length; j++){
        let depth = 1; // pulled off starting '['
        let segmentEnd = 0;
        for(let i = openIndexes[j] + 1; i < combine.length; i++){
            if (combine[i] === '[') depth += 1;
            if (combine[i] === ']') depth -= 1;
            if (depth === 0){
                segmentEnd = i;
                break;
            }
        }
        let segment = combine.substring(openIndexes[j], segmentEnd + 1);
        segments.push(segment);
        // Position 5 because the outermost doesn't count
        if (depths[segments.length - 1] >= 5 && segment.substring(1, segment.length -1).indexOf('[') === -1) {
            console.log("Explosion at Position " + openIndexes[j] + ": " + segment);
            let blastParts = segment.substring(1, segment.length -1).split(',').map(o => parseInt(o));
            // Replace Right to Left to avoid messing w/ indexes too badly
            let foundRightNumber = false;
            let rightNumber = '';
            let rightPos = 0;
            for(let right = openIndexes[j] + segment.length; right < combine.length; right++){
                if (combine[right] === '[' && foundRightNumber) break;
                if (combine[right] === ']' && foundRightNumber) break;
                if (combine[right] === ',' && foundRightNumber) break;
                if (combine[right] === '[') continue;
                if (combine[right] === ']') continue;
                if (combine[right] === ',') continue;
                if (!foundRightNumber) rightPos = right;
                foundRightNumber = true;
                rightNumber = rightNumber + combine[right];
            }
            if (foundRightNumber) {
                // console.log("Found right number: " + rightNumber + " at " + rightPos);
                let newLeft = combine.substring(0, rightPos);
                let newRight = combine.substring(rightPos + rightNumber.length);
                let blastRight = blastParts[1] + parseInt(rightNumber);
                combine = newLeft + blastRight + newRight;
            } else {
                // console.log("No right number, discard!");
            }

            // Replace Middle
            let segmentLeft = combine.substring(0, openIndexes[j]);
            let segmentRight = combine.substring(openIndexes[j] + segment.length);
            combine = segmentLeft + '0' + segmentRight;
            
            // Replace Left
            let foundLeftNumber = false;
            let leftNumber = '';
            let leftPos = 0;
            for(let left = openIndexes[j] - 1; left >= 0; left--) {
                if (combine[left] === '[' && foundLeftNumber) break;
                if (combine[left] === ']' && foundLeftNumber) break;
                if (combine[left] === ',' && foundLeftNumber) break;
                if (combine[left] === '[') continue;
                if (combine[left] === ']') continue;
                if (combine[left] === ',') continue;
                foundLeftNumber = true;
                leftPos = left;
                leftNumber = combine[left] + leftNumber;
            }
            if (foundLeftNumber) {
                // console.log("Found left number: " + leftNumber + " at " + leftPos);
                let newLeft = combine.substring(0, leftPos);
                let newRight = combine.substring(leftPos + leftNumber.length);
                let blastLeft = blastParts[0] + parseInt(leftNumber);
                combine = newLeft + blastLeft + newRight;
            } else {
                // console.log("No left number, discard!");
            }
            break;
        }   
    }
    
    // No Explosion detected, check for splits
    if (combine === input) {
        let foundNumber = false;
        let number = '';
        let pos = 0;
        for(let i = 0; i < combine.length; i++){
            if (combine[i] === '[' && foundNumber) {
                if (parseInt(number) < 10) {
                    number = '';
                    pos = 0;
                    foundNumber = false;
                } else break;
            }
            if (combine[i] === ']' && foundNumber) {
                if (parseInt(number) < 10) {
                    number = '';
                    pos = 0;
                    foundNumber = false;
                } else break;
            }
            if (combine[i] === ',' && foundNumber) {
                if (parseInt(number) < 10) {
                    number = '';
                    pos = 0;
                    foundNumber = false;
                } else break;
            }
            if (combine[i] === '[') continue;
            if (combine[i] === ']') continue;
            if (combine[i] === ',') continue;
            if (!foundNumber) pos = i;
            foundNumber = true;
            number = number + combine[i];
        }
        if (foundNumber) {
            console.log("Found split number: " + number + " at " + pos);
            let newLeft = combine.substring(0, pos);
            let newRight = combine.substring(pos + number.length);
            combine = newLeft + '[' + Math.floor(parseInt(number) / 2) + ',' + Math.ceil(parseInt(number) / 2) + ']' + newRight;
        } 
        // console.log("Need to implement SPLIT!");
    }
    if (input === combine) return "DONE!";
    return combine;
}

// Day 16 logic again
const reduce = (input) => {
    console.log(input.length);
    let openIndexes = [];
    let opens = input.split('[');
    let pos = 0;
    for(let i = 0; i < opens.length; i++){
        pos += opens[i].length;
        openIndexes.push(pos);
        pos += 1;
    }
    openIndexes.pop();
    let segments = [];

    for(let j = 0; j < openIndexes.length; j++){
        let depth = 1; // pulled off starting '['
        let segmentEnd = 0;
        for(let i = openIndexes[j] + 1; i < input.length; i++){
            if (input[i] === '[') depth += 1;
            if (input[i] === ']') depth -= 1;
            if (depth === 0){
                segmentEnd = i;
                break;
            }
        }
        segments.push(input.substring(openIndexes[j], segmentEnd + 1));
    }
    // console.log(segments);
    
    for(let i = 0; i < segments.length; i++) {
        if (segments[i].split('[').length === 2) {
            let values = segments[i].substring(1, segments[i].length - 1).split(',').map(o => parseInt(o));
            let value = (3 * values[0]) + (2 * values[1]);
            let segmentLeft = input.substring(0, openIndexes[i]);
            let segmentRight = input.substring(openIndexes[i] + segments[i].length);
            input = segmentLeft + value + segmentRight;
            break;
        }
    }
    return input;
}

const solve_dec_18_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec18.txt', 'utf8');
        const lines = data.split('\n');

        let maxAmplitude = 0;
        for(let i = 0; i < lines.length; i++){
            for (let j = 0; j < lines.length; j++){
                if (i === j) continue;
                let combine = '[' + lines[i] + ',' + lines[j] + ']';
                while(true) {
                    let test = simplify(combine);
                    console.log(test === "DONE!");
                    if (test === 'DONE!') {
                        break;
                    } else {
                        combine = test;
                        console.log(combine);
                    }
                }

                while(combine.indexOf("[") >= 0) {
                    combine = reduce(combine);
                }
                console.log("Amplitude " + i + "," + j + ": " + combine);
                if (parseInt(combine) > maxAmplitude) maxAmplitude = parseInt(combine);
            }
        }
        
        return maxAmplitude;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();