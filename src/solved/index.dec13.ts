"use strict";
// tslint:disable
import fs = require('fs');
import { rangeRight } from 'lodash';

const start = (): void => {
    console.log(solve_dec_13_pt1());
    // console.log(solve_dec_13_pt2());
};

module.exports = {
    start
};


const solve_dec_13_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec13.txt', 'utf8');
        const lines = data.split('\n');

        let coords = [];
        let folds = [];
        let maxX = 0;
        let maxY = 0;
        for(let i = 0; i < lines.length; i++) {
            if (lines[i].length > 0 && !lines[i].startsWith('fold')){
                coords.push(lines[i]);
                if (parseInt(lines[i].split(',')[0]) > maxX) maxX = parseInt(lines[i].split(',')[0]);
                if (parseInt(lines[i].split(',')[1]) > maxY) maxY = parseInt(lines[i].split(',')[1]);
            } else if (lines[i].length > 0){
                folds.push(lines[i].replace("fold along ", ""));
            }  
        }
        // draw(coords, maxX, maxY);

        while(folds.length > 0){
            let fold = folds.shift();
            if (fold.startsWith("x=")){
                // Fold over vertical line at X
                let fulcrum = parseInt(fold.replace("x=", ""));
                console.log("Fulcrum X = " + fulcrum + ", MaxX = " + maxX);
                let left = coords.filter(o => parseInt(o.split(',')[0]) < fulcrum);
                let right = coords.filter(o => parseInt(o.split(',')[0]) > fulcrum);
                for(let i = 0; i < right.length; i++) {
                    let x= parseInt(right[i].split(',')[0]);
                    let y= parseInt(right[i].split(',')[1]);
                    console.log("Map x = " + x + " to " + (maxX - x));
                    x = maxX - x; 
                    if (!left.includes(x + ',' + y)) left.push(x + ',' + y);
                }
                maxX = fulcrum - 1;
                coords = left;
            } else {
                // Fold up horizontal line at Y
                let fulcrum = parseInt(fold.replace("y=", ""));
                console.log("Fulcrum Y = " + fulcrum + ", MaxY = " + maxY);
                let top = coords.filter(o => parseInt(o.split(',')[1]) < fulcrum);
                let bottom = coords.filter(o => parseInt(o.split(',')[1]) > fulcrum);
                for(let i = 0; i < bottom.length; i++) {
                    let x= parseInt(bottom[i].split(',')[0]);
                    let y= parseInt(bottom[i].split(',')[1]);
                    console.log("Map y = " + y + " to " + (maxY - y));
                    y = maxY - y; 
                    if (!top.includes(x + ',' + y)) top.push(x + ',' + y);
                }
                maxY = fulcrum - 1;
                coords = top;
            }
            // draw(coords, maxX, maxY);
            // Pt1: break;
            // Pt2:  remove break
        }

        console.log(coords);

        return draw(coords, maxX, maxY);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const draw = (coords, maxX, maxY) => {
    let dots = 0;
    for(let y = 0; y <= maxY; y++){
        let line = '';
        for(let x = 0; x <= maxX; x++){
            if (coords.includes(x + ',' + y)) {
                line += '#';
                dots += 1;
            }
            else {
                line += '.';
            }
        }
        console.log(line);
    }
    return dots;
}

const solve_dec_13_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec13.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



