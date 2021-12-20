"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_5_pt1());
    console.log(solve_dec_5_pt2());
};

module.exports = {
    start
};

const solve_dec_5_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec5.txt', 'utf8');
        const lines = data.split('\n');
        
        let safetyMap = {};
        for(let i = 0; i < lines.length; i++) {
            let coords = lines[i].split(' -> ');
            let from = coords[0].trim().split(',').map(o => parseInt(o));
            let to = coords[1].trim().split(',').map(o => parseInt(o));
            if (from[0] === to[0]){
                console.log("x match " + coords);
                // X match
                let fromPoint = from[1] < to[1] ? from[1] : to[1];
                let toPoint = from[1] < to[1] ? to[1] : from[1];
                console.log ("Map " + fromPoint + " to " + toPoint + " with x = " + from[0]);
                for(let j = fromPoint; j <= toPoint; j++) {
                    if (safetyMap[from[0] + ',' + j]) safetyMap[from[0] + ',' + j] = safetyMap[from[0] + ',' + j] + 1;
                    else safetyMap[from[0] + ',' + j] = 1;
                }
            } else if (from[1] === to[1]) {
                // Y match
                let fromPoint = from[0] < to[0] ? from[0] : to[0];
                let toPoint = from[0] < to[0] ? to[0] : from[0];
                console.log ("Map " + fromPoint + " to " + toPoint + " with y = " + from[1]);
                
                for(let j = fromPoint; j <= toPoint; j++){
                    if (safetyMap[j + ',' + from[1]]) safetyMap[j + ',' + from[1]] = safetyMap[j + ',' + from[1]] + 1;
                    else safetyMap[j + ',' + from[1]] = 1;
                }
            } else {
                console.log("Skipping " + coords);
            }
        }

        let count = Array.from(Object.values(safetyMap)).filter(o => o >= 2).length;
        
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_5_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec5.txt', 'utf8');
        const lines = data.split('\n');
        let safetyMap = {};
        for(let i = 0; i < lines.length; i++) {
            let coords = lines[i].split(' -> ');
            let from = coords[0].trim().split(',').map(o => parseInt(o));
            let to = coords[1].trim().split(',').map(o => parseInt(o));
            if (from[0] === to[0]){
                // X match
                let fromPoint = from[1] < to[1] ? from[1] : to[1];
                let toPoint = from[1] < to[1] ? to[1] : from[1];
                console.log ("Map " + fromPoint + " to " + toPoint + " with x = " + from[0]);
                for(let j = fromPoint; j <= toPoint; j++) {
                    if (safetyMap[from[0] + ',' + j]) safetyMap[from[0] + ',' + j] = safetyMap[from[0] + ',' + j] + 1;
                    else safetyMap[from[0] + ',' + j] = 1;
                }
            } else if (from[1] === to[1]) {
                // Y match
                let fromPoint = from[0] < to[0] ? from[0] : to[0];
                let toPoint = from[0] < to[0] ? to[0] : from[0];
                console.log ("Map " + fromPoint + " to " + toPoint + " with y = " + from[1]);
                
                for(let j = fromPoint; j <= toPoint; j++){
                    if (safetyMap[j + ',' + from[1]]) safetyMap[j + ',' + from[1]] = safetyMap[j + ',' + from[1]] + 1;
                    else safetyMap[j + ',' + from[1]] = 1;
                }
            } else {
                // Diagonal 
                let fromX = from[0];
                let toX = to[0];
                let fromY = from[1];
                let toY = to[1];
                console.log("Map Diagonal x: " + fromX + " to " + toX + ", y: " + fromY + " to " + toY);

                let steps = Math.abs(toX - fromX);
                for(let i = 0; i <= steps; i++) {
                    console.log(fromX + ',' + fromY);
                    if (safetyMap[fromX + ',' + fromY]) safetyMap[fromX + ',' + fromY] = safetyMap[fromX + ',' + fromY] + 1;
                    else safetyMap[fromX + ',' + fromY] = 1;
                    if (fromX < toX){
                        // x increasing
                        fromX += 1;
                    } else {
                        // x decreasing
                        fromX -= 1;
                    }
                    if (fromY < toY){
                        // y increasing
                        fromY += 1;
                    } else {
                        // y decreasing
                        fromY -= 1;
                    }
                }   
            }
        }

        let count = Array.from(Object.values(safetyMap)).filter(o => o >= 2).length;
        
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



