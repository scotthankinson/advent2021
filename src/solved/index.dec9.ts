"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_9_pt1());
    console.log(solve_dec_9_pt2());
};

module.exports = {
    start
};


const solve_dec_9_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec9.txt', 'utf8');
        const lines = data.split('\n');
        let map = {};
        let maxX = lines[0].length;
        let maxY = lines.length;
        for(let y = 0; y < lines.length; y++){
            for(let x = 0; x < lines[y].length; x++){
                map[x + ',' + y] = lines[y][x];
            }
        }

        let lowPoints = [];
        for(let y = 0; y < maxY; y++){
            for(let x = 0; x < maxX; x++){
                if (isLowPoint(map, x, y)){
                    console.log("Low Point: " + map[x + ',' + y] + " at " + x + "," + y);
                    lowPoints.push(map[x + ',' + y]);
                }
            }
        }    
        
        console.log(lowPoints);
        let sum = 0;
        lowPoints.forEach(o => sum += parseInt(o) + 1);
        return sum;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const isLowPoint = (map, x, y) => {
    let point = map[x + ',' + y];
    let isLow = true;
    // top
    if (map[x +',' + (y-1)] && map[x +',' + (y-1)] <= point) isLow = false;
    // left
    if (map[(x-1) + ',' + y] && map[(x-1) + ',' + y] <= point) isLow = false;
    // right
    if (map[(x+1) + ',' + y] && map[(x+1) + ',' + y] <= point) isLow = false;
    // bottom
    if (map[x +',' + (y+1)] && map[x +',' + (y+1)] <= point) isLow = false;
    return isLow;
}
const draw = (map, maxX, maxY) => {
    for(let y = 0; y < maxY; y++){
        let line = '';
        for(let x = 0; x < maxX; x++){
            line += map[x + ',' + y];
        }
        console.log(line);
    }
}

const solve_dec_9_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec9.txt', 'utf8');
        const lines = data.split('\n');
        let map = {};
        let maxX = lines[0].length;
        let maxY = lines.length;
        for(let y = 0; y < lines.length; y++){
            for(let x = 0; x < lines[y].length; x++){
                map[x + ',' + y] = lines[y][x];
            }
        }

        let basins = [];
        for(let y = 0; y < maxY; y++){
            for(let x = 0; x < maxX; x++){
                if (isLowPoint(map, x, y)){
                    console.log("Low Point: " + map[x + ',' + y] + " at " + x + "," + y);
                    let basinPoints = new Set();
                    mapBasin(map, x, y, basinPoints);
                    console.log("Basin size: " + basinPoints.size);
                    basins.push(basinPoints.size);
                }
            }
        }    
        
        basins = basins.sort((a, b) => a < b ? 1 : -1);
        console.log(basins);
        return basins[0] * basins[1] * basins[2];
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const mapBasin = (map, x, y, points) => {
    if (map[x + ',' + y] === '9') return;
    points.add(x + ',' + y);
    if (map[(x - 1) + ',' + y] && !points.has((x-1) + ',' + y)) mapBasin(map, x - 1, y, points);
    if (map[(x + 1) + ',' + y] && !points.has((x+1) + ',' + y)) mapBasin(map, x + 1, y, points);
    if (map[x + ',' + (y - 1)] && !points.has(x + ',' + (y - 1))) mapBasin(map, x, y - 1, points);
    if (map[x + ',' + (y + 1)] && !points.has(x + ',' + (y + 1))) mapBasin(map, x, y + 1, points);
}

start();



