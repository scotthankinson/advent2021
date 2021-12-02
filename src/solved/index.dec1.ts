"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_1_pt1());
    console.log(solve_dec_1_pt2());
};

module.exports = {
    start
};


const solve_dec_1_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec1.txt', 'utf8');
        const lines = data.split('\n');
        let number = 9999999;
        let increases = 0;
        for(let i = 0; i < lines.length; i++) {
            if (parseInt(lines[i]) > number) increases++;
            number = parseInt(lines[i]);
        }

        return increases;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_1_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec1.txt', 'utf8');
        const lines = data.split('\n');

        let number = 9999999999;
        let increases = 0;
        for(let i = 0; i < lines.length - 2; i++) {
            let funnyNumber = parseInt(lines[i]) + parseInt(lines[i + 1]) + parseInt(lines[i + 2]);
            if (funnyNumber > number) increases++;
            number = funnyNumber;
        }


        return increases;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



