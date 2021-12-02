"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_2_pt1());
    console.log(solve_dec_2_pt2());
};

module.exports = {
    start
};


const solve_dec_2_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec2.txt', 'utf8');
        const lines = data.split('\n');
        let depth = 0;
        let distance = 0;
        for(let i = 0; i < lines.length; i++) {
            let parts = lines[i].split(' ');
            if (parts[0] === 'forward'){
                distance += parseInt(parts[1]);
            } else if (parts[0] === 'down') {
                depth += parseInt(parts[1]);
            } else if (parts[0] === 'up') {
                depth -= parseInt(parts[1]);
            }
        }
        console.log("Depth: " + depth + ", Distance: " + distance);
        return depth * distance;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_2_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec2.txt', 'utf8');
        const lines = data.split('\n');

        let depth = 0;
        let distance = 0;
        let aim = 0;
        for(let i = 0; i < lines.length; i++) {
            let parts = lines[i].split(' ');
            if (parts[0] === 'forward'){
                distance += parseInt(parts[1]);
                depth += aim * parseInt(parts[1]);
            } else if (parts[0] === 'down') {
                aim += parseInt(parts[1]);
            } else if (parts[0] === 'up') {
                aim -= parseInt(parts[1]);
            }
        }
        console.log("Depth: " + depth + ", Distance: " + distance);
        return depth * distance;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



