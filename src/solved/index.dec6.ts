"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_6_pt1());
    console.log(solve_dec_6_pt2());
};

module.exports = {
    start
};


const solve_dec_6_pt1 = () => {
    try {
        // let data = fs.readFileSync('src/test.dec6.txt', 'utf8');
        // const lines = data.split('\n');
        let input = '3,4,3,1,2';
        // let input = '5,1,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,1,4,2,1,1,1,3,5,1,1,1,5,4,1,1,1,2,2,1,1,1,2,1,1,1,2,5,2,1,2,2,3,1,1,1,1,1,1,1,1,5,1,1,4,1,1,1,5,4,1,1,3,3,2,1,1,1,5,1,1,4,1,1,5,1,1,5,1,2,3,1,5,1,3,2,1,3,1,1,4,1,1,1,1,2,1,2,1,1,2,1,1,1,4,4,1,5,1,1,3,5,1,1,5,1,4,1,1,1,1,1,1,1,1,1,2,2,3,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,5,1,1,1,1,4,1,1,1,1,4,1,1,1,1,3,1,2,1,2,1,3,1,3,4,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,4,1,1,2,2,1,2,4,1,1,3,1,1,1,5,1,3,1,1,1,5,5,1,1,1,1,2,3,4,1,1,1,1,1,1,1,1,1,1,1,1,5,1,4,3,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,3,3,1,2,2,1,4,1,5,1,5,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,4,3,1,1,4';
        let fishesDelicious = input.split(',').map(o => parseInt(o));
        for(let i = 0; i < 80; i++){
            console.log(i + ":" + fishesDelicious.length);
            fishesDelicious = oneDayForward(fishesDelicious);
        }
        return fishesDelicious.length;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const oneDayForward = (fishes) => {
    let timePassing = fishes.map(o => o - 1);
    let waiting = timePassing.filter(o => o >= 0);
    let spawning = timePassing.filter(o => o < 0);
    for(let i = 0; i < spawning.length; i++){
        waiting.push(6);
        waiting.push(8);
    }
    // console.log(waiting);
    return waiting;
}


const solve_dec_6_pt2 = () => {
    try {
        // let data = fs.readFileSync('src/test.dec6.txt', 'utf8');
        // const lines = data.split('\n');
        // let input = '3,4,3,1,2';
        let input = '5,1,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,1,4,2,1,1,1,3,5,1,1,1,5,4,1,1,1,2,2,1,1,1,2,1,1,1,2,5,2,1,2,2,3,1,1,1,1,1,1,1,1,5,1,1,4,1,1,1,5,4,1,1,3,3,2,1,1,1,5,1,1,4,1,1,5,1,1,5,1,2,3,1,5,1,3,2,1,3,1,1,4,1,1,1,1,2,1,2,1,1,2,1,1,1,4,4,1,5,1,1,3,5,1,1,5,1,4,1,1,1,1,1,1,1,1,1,2,2,3,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,5,1,1,1,1,4,1,1,1,1,4,1,1,1,1,3,1,2,1,2,1,3,1,3,4,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,4,1,1,2,2,1,2,4,1,1,3,1,1,1,5,1,3,1,1,1,5,5,1,1,1,1,2,3,4,1,1,1,1,1,1,1,1,1,1,1,1,5,1,4,3,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,3,3,1,2,2,1,4,1,5,1,5,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,4,3,1,1,4';
        let periods = {};
        for(let i = 0; i < 9; i++) {
            periods['' + i] = 0;
        }
        let fishesDelicious = input.split(',').map(o => parseInt(o));
        for(let i = 0; i < fishesDelicious.length; i++){
            periods['' + fishesDelicious[i]] = periods['' + fishesDelicious[i]] + 1;
        }
        
        for(let i = 0; i < 256; i++){
            let updatedPeriods = {};
            updatedPeriods['8'] = periods['0'];
            updatedPeriods['7'] = periods['8'];
            updatedPeriods['6'] = periods['7'] + periods['0'];
            updatedPeriods['5'] = periods['6'];
            updatedPeriods['4'] = periods['5'];
            updatedPeriods['3'] = periods['4'];
            updatedPeriods['2'] = periods['3'];
            updatedPeriods['1'] = periods['2'];
            updatedPeriods['0'] = periods['1'];
            periods = JSON.parse(JSON.stringify(updatedPeriods));
        }

        console.log(periods);
        let population = 0;
        for(let i = 0; i < 9; i++){
            population += periods['' + i];
        }
        return population;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



