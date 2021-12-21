"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_11_pt1());
    console.log(solve_dec_11_pt2());
};

module.exports = {
    start
};


const solve_dec_11_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec11.txt', 'utf8');
        const lines = data.split('\n');
        let map = {};
        for (let y = 0; y < lines.length; y++){
            for(let x = 0; x < lines[0].length; x++){
                map[x + ',' + y] = parseInt(lines[y][x]);
            }
        }

        draw(map);
        let flashes = 0;
        for(let i = 0; i < 100; i++){
            flashes += step(map);
            draw(map);    
        }

        return flashes;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const step = (map) => {
    let cascades = [];
    let flashes = 0;
    // Increment
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            let key = x + ',' + y;
            map[key] = map[key] + 1;
            if (map[key] === 10) {
                cascades.push(key);
            }
        }
    }

    // Cascade
    while (cascades.length > 0) {
        let cascade = cascades.shift();
        // console.log("cascade at " + cascade);
        let x = parseInt(cascade.split(',')[0]);
        let y = parseInt(cascade.split(',')[1]);
        // Top Left
        if (map[(x-1) + ',' + (y -1)]) {
            map[(x-1) + ',' + (y -1)] += 1;
            if (map[(x-1) + ',' + (y -1)] === 10) cascades.push((x-1) + ',' + (y-1));
        }
        // Top
        if (map[x + ',' + (y -1)]) {
            map[x + ',' + (y -1)] += 1;
            if (map[x + ',' + (y -1)] === 10) cascades.push(x + ',' + (y -1));
        }
        // Top Right
        if (map[(x+1) + ',' + (y -1)]) {
            map[(x+1) + ',' + (y -1)] += 1;
            if (map[(x+1) + ',' + (y -1)] === 10) cascades.push((x+1) + ',' + (y -1));
        }
        // Left
        if (map[(x-1) + ',' + y]) {
            map[(x-1) + ',' + y] += 1;
            if (map[(x-1) + ',' + y] === 10) cascades.push((x-1) + ',' + y);
        }
        // Right
        if (map[(x+1) + ',' + y]) {
            map[(x+1) + ',' + y] += 1;
            if (map[(x+1) + ',' + y] === 10) cascades.push((x+1) + ',' + y);
        }
        // Bottom Left
        if (map[(x-1) + ',' + (y+1)]) {
            map[(x-1) + ',' + (y+1)] += 1;
            if (map[(x-1) + ',' + (y+1)] === 10) cascades.push((x-1) + ',' + (y+1));
        }
        // Bottom
        if (map[x + ',' + (y+1)]) {
            map[x + ',' + (y+1)] += 1;
            if (map[x + ',' + (y+1)] === 10) cascades.push(x + ',' + (y+1));
        }
        // Bottom Right
        if (map[(x+1) + ',' + (y+1)]) {
            map[(x+1) + ',' + (y+1)] += 1;
            if (map[(x+1) + ',' + (y+1)] === 10) cascades.push((x+1) + ',' + (y+1));
        }
    }

    // Reset
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            let key = x + ',' + y;
            if (map[key] >= 10) {
                flashes += 1;
                map[key] = 0;
            }
        }
    }
    return flashes;
}

const draw = (map) => {
    console.log("----------");
    for(let y = 0; y < 10; y++){
        let line = '';
        for(let x = 0; x < 10; x++){
            line += map[x + ',' + y];
        }
        console.log(line);
    }
}


const solve_dec_11_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec11.txt', 'utf8');
        const lines = data.split('\n');
        let map = {};
        for (let y = 0; y < lines.length; y++){
            for(let x = 0; x < lines[0].length; x++){
                map[x + ',' + y] = parseInt(lines[y][x]);
            }
        }

        draw(map);
        let steps = 0;
        let flashes = 0;
        while (flashes !== 100){
            flashes = step(map);
            steps += 1;
        }
        
        return steps;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



