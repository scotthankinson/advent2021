"use strict";
// tslint:disable
import fs = require('fs');
import { decode } from 'punycode';

const start = (): void => {
    // console.log(solve_dec_8_pt1());
    console.log(solve_dec_8_pt2());
};

module.exports = {
    start
};

const solve_dec_8_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec8.txt', 'utf8');
        const lines = data.split('\n');

        // 0 - 6 Segments   0, 6, 9
        // 1 - 2 Segments   UNIQUE
        // 2 - 5 Segments   2, 3, 5
        // 3 - 5 Segments   2, 3, 5
        // 4 - 4 Segments   UNIQUE
        // 5 - 5 Segments   2, 3, 5
        // 6 - 6 Segments   0, 6, 9
        // 7 - 3 Segments   UNIQUE
        // 8 - 7 Segments   UNIQUE
        // 9 - 6 Segments   0, 6, 9
        let countUnique = 0;
        let checkDistinct = new Set([2, 3, 4, 7]);

        for(let i = 0; i < lines.length; i++){
            let parts = lines[i].split('|')[1].trim().split(' ');
            console.log(parts);
            console.log(parts.filter(o => checkDistinct.has(o.length)));
            countUnique += parts.filter(o => checkDistinct.has(o.length)).length;
        }
        return countUnique;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_8_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec8.txt', 'utf8');
        const lines = data.split('\n');

        let sum = 0;
        for(let i = 0; i < lines.length; i++){
            let value = decodeEntry(lines[i]);
            console.log(value);
            sum += value;
        }

        return sum;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const decodeEntry = (input) => {
    let decoder = {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''};
    // 0 - 6 Segments   0, 6, 9         1110111
    // 1 - 2 Segments   UNIQUE          0010010     
    // 2 - 5 Segments   2, 3, 5         1011101
    // 3 - 5 Segments   2, 3, 5         1011011
    // 4 - 4 Segments   UNIQUE          0111011
    // 5 - 5 Segments   2, 3, 5         1101011
    // 6 - 6 Segments   0, 6, 9         1101111
    // 7 - 3 Segments   UNIQUE          1010010
    // 8 - 7 Segments   UNIQUE          1111111
    // 9 - 6 Segments   0, 6, 9         1111011
    let combinations = input.split('|')[0].trim().split(' ').map(o => o.split('').sort().join(''));
    // console.log(combinations);
    let output = input.split('|')[1].trim().split(' ').map(o => o.split('').sort().join(''));
    decoder['1'] = combinations.filter(o => o.length === 2)[0];
    decoder[decoder['1']] = '1';
    decoder['4'] = combinations.filter(o => o.length === 4)[0];
    decoder[decoder['4']] = '4';
    decoder['7'] = combinations.filter(o => o.length === 3)[0];
    decoder[decoder['7']] = '7';
    decoder['8'] = combinations.filter(o => o.length === 7)[0];
    decoder[decoder['8']] = '8';
    // 2, 3, 5 -- 5 Segments
    // 0, 6, 9 -- 6 Segments
    // 7 wholly contains 1 -- isolates top row    
    let topRow = decoder['7'];
    decoder[1].split('').forEach(o => topRow = topRow.replace(o, ''));
    // console.log("Top Row: " + topRow);
    // 9 wholly contains 1, 4, 7 with one segment left over (bottom row)
    let candidates = combinations.filter(o => o.length === 6);
    let candidate = '';
    let bottomRow = '';
    let parts = decoder['7'].split('').concat(decoder['4'].split(''));
    for(let i = 0; i < candidates.length; i++){
        parts.forEach(o => candidates[i] = candidates[i].replace(o, ''));
        if (candidates[i].length === 1) {
            bottomRow = candidates[i];
            candidate = combinations.filter(o => o.length === 6)[i];
            break;
        }
    }
    decoder['9'] = candidate;
    decoder[decoder['9']] = '9';
    // console.log("Bottom Row: " + bottomRow);    
    // 3 is top row + bottom row + #1 with one segment left over (middle row)
    candidates = combinations.filter(o => o.length === 5);
    candidate = '';
    let middleRow = '';
    parts = decoder['1'].split('').concat([bottomRow, topRow]);
    for(let i = 0; i < candidates.length; i++){
        parts.forEach(o => candidates[i] = candidates[i].replace(o, ''));
        if (candidates[i].length === 1) {
            middleRow = candidates[i];
            candidate = combinations.filter(o => o.length === 5)[i];
            break;
        }
    }
    decoder['3'] = candidate;
    decoder[decoder['3']] = '3';
    // console.log("Middle Row: " + middleRow);    
    // 0 is 8 minus middleRow
    decoder['0'] = decoder['8'].replace(middleRow, '');
    decoder[decoder['0']] = '0';
    // 6 is the missing 6-segment
    decoder['6'] = combinations.filter(o => o.length === 6).filter(o => o !== decoder['9'] && o !== decoder['0'])[0];
    decoder[decoder['6']] = '6';

    // 5 minus 9 has one left over -- top right
    candidates = combinations.filter(o => o.length === 5);
    candidate = '';
    let topRight = '';
    
    for(let i = 0; i < candidates.length; i++){
        let nine = decoder['9'];
        parts = candidates[i].split('');
        parts.forEach(o => nine = nine.replace(o, ''));
        if (nine.length === 1 && candidates[i] !== decoder['3']) {
            topRight = nine;
            candidate = candidates[i];
            break;
        }
    }
    decoder['5'] = candidate;
    decoder[decoder['5']] = '5';
    // console.log("Top Right: " + topRight);    
    
    // 2 is missing 5-segment
    decoder['2'] = combinations.filter(o => o.length === 5).filter(o => o !== decoder['3'] && o !== decoder['5'])[0];
    decoder[decoder['2']] = '2';


    // console.log(decoder);
    let decoded = parseInt(output.map(o => decoder[o]).join(''));
    return decoded;
}

/*

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

 */



start();



