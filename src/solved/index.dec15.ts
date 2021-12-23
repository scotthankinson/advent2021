"use strict";
// tslint:disable
import fs = require('fs');
import { indexOf } from 'lodash';
import { forEachLeadingCommentRange } from 'typescript';

const start = (): void => {
    // console.log(solve_dec_15_pt1());
    console.log(solve_dec_15_pt2());
};

module.exports = {
    start
};

const solve_dec_15_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec15.txt', 'utf8');
        const lines = data.split('\n');

        let riskMap = {};
        let pathMap = {};
        for(let y = 0; y < lines.length; y++){
            for(let x = 0; x < lines[0].length; x++){
                riskMap[x + ',' + y] = parseInt(lines[y][x]);
                pathMap[x + ',' + y] = 0;
            }
        }
        riskMap['0,0'] = 0; // costs nothing to leave home base

        // draw(pathMap, 10, 10);
        
        let paths = ['0,0'];
        let count = 0;
        while (paths.length > 0) {
            count +=1;
            if (count % 50 === 0) {
                console.log(count + ": " + paths.length + " paths, " + Object.values(pathMap).filter(o => o === 0).length + " unvisited");
                // console.log(paths);
                // draw(pathMap, 100, 100);

            }
            let parts = paths.shift().split(',').map(o => parseInt(o));
            let branch = {x: parts[0], y: parts[1]};
            
            // top
            if (riskMap[branch.x + ',' + (branch.y - 1)]) {
                let newBranch = {x: branch.x, y: branch.y - 1};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }
            // bottom
            if (riskMap[branch.x + ',' + (branch.y + 1)]) {
                let newBranch = {x: branch.x, y: branch.y + 1};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }

            // left
            if (riskMap[(branch.x - 1) + ',' + branch.y]) {
                let newBranch = {x: branch.x - 1, y: branch.y};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }

            // right
            if (riskMap[(branch.x + 1) + ',' + branch.y]) {
                let newBranch = {x: branch.x + 1, y: branch.y};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }

            // Prune paths when they get too big
            if (paths.length > 250){
                // console.log("Pruning from " + paths.length);
                paths = Array.from(new Set(paths).values());
                // console.log(".... to " + paths.length);
            }
            // console.log(paths);
            // draw(pathMap, 10, 10);
            // if (paths[0].x === lines.length -1 && paths[0].y === lines.length - 1) break;
        }
        // draw(riskMap, 10, 10);
        // draw(pathMap, 10, 10);
        // console.log(paths);
        // console.log(riskMap);
        
        return pathMap[(lines.length - 1) + ',' + (lines.length - 1)];
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const draw = (map, maxX, maxY) => {
    console.log("----------");
    for(let y = 0; y < maxY; y++){
        let line = '';
        for(let x = 0; x < maxX; x++){
            line += ("" + map[x + ',' + y]).padEnd(3, " ");
        }
        console.log(line);
    }
    console.log("----------");
}


const solve_dec_15_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec15.txt', 'utf8');
        const lines = data.split('\n');

        let riskMap = {};
        let pathMap = {};
        let maxX = 0;
        let maxY = 0;
        for(let col = 0; col < 5; col++){
            for(let row = 0; row < 5; row++){
                for(let y = 0; y < lines.length; y++){
                    for(let x = 0; x < lines[0].length; x++){
                        let oneX = row * lines.length + x;
                        let oneY = col * lines.length + y;
                        riskMap[oneX + ',' + oneY] = parseInt(lines[y][x]) + row + col; // need to do the increments
                        pathMap[oneX + ',' + oneY] = 0;
                        if (riskMap[oneX + ',' + oneY] > 9) riskMap[oneX + ',' + oneY] = riskMap[oneX + ',' + oneY] - 9;
                        if (oneX > maxX) maxX = oneX;
                        if (oneX > maxY) maxY = oneY;
                    }
                }    
            }
        }
        // console.log(pathMap);
        riskMap['0,0'] = 0; // costs nothing to leave home base

        // draw(pathMap, 10, 10);
        
        let paths = ['0,0'];
        let count = 0;
        while (paths.length > 0) {
            count +=1;
            if (count % 1000 === 0) {
                console.log(count + ": " + paths.length + " paths, " + Object.values(pathMap).filter(o => o === 0).length + " unvisited");
                // console.log(paths);
                // draw(pathMap, 100, 100);

            }
            let parts = paths.shift().split(',').map(o => parseInt(o));
            let branch = {x: parts[0], y: parts[1]};
            
            // top
            if (riskMap[branch.x + ',' + (branch.y - 1)]) {
                let newBranch = {x: branch.x, y: branch.y - 1};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }
            // bottom
            if (riskMap[branch.x + ',' + (branch.y + 1)]) {
                let newBranch = {x: branch.x, y: branch.y + 1};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }

            // left
            if (riskMap[(branch.x - 1) + ',' + branch.y]) {
                let newBranch = {x: branch.x - 1, y: branch.y};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }

            // right
            if (riskMap[(branch.x + 1) + ',' + branch.y]) {
                let newBranch = {x: branch.x + 1, y: branch.y};
                let moveCost = pathMap[branch.x + ',' + branch.y] + riskMap[newBranch.x + ',' + newBranch.y];
                if (moveCost > pathMap[newBranch.x + ',' + newBranch.y] && pathMap[newBranch.x + ',' + newBranch.y] > 0) {
                    // Skip moves that are worse than we have already made
                } else {
                    pathMap[newBranch.x + ',' + newBranch.y] = moveCost;
                    paths.push(newBranch.x + ',' + newBranch.y);
                }
            }

            // Periodically prune paths to keep from killing our processing time
            if (count % 250 === 0) {
                // console.log("Pruning from " + paths.length);
                paths = Array.from(new Set(paths).values());
                // console.log(".... to " + paths.length);
            }
            // console.log(paths);
            // draw(pathMap, 10, 10);
            // if (paths[0].x === lines.length -1 && paths[0].y === lines.length - 1) break;
        }
        // draw(riskMap, 10, 10);
        // draw(pathMap, 10, 10);
        // console.log(paths);
        // console.log(riskMap);
        
        return pathMap[maxX + ',' + maxY];
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



// Works great for the 10x10, unlikely to ever finish for the 100x100
const solve_dec_15_pt1_brutesquad = () => {
    try {
        let data = fs.readFileSync('src/test.dec15.txt', 'utf8');
        const lines = data.split('\n');

        let riskMap = {};
        for(let y = 0; y < lines.length; y++){
            for(let x = 0; x < lines[0].length; x++){
                riskMap[x + ',' + y] = parseInt(lines[y][x]);
            }
        }
        
        let maxX = lines[0].length - 1;
        let maxY = lines.length - 1;
        
        let paths = [{x: 0, y: 0, risk: 0, path: {}}];
        let steps = 0;
        let leadingRisk = 0;
        while (true) {
            steps += 1;
            if (steps % 1000 === 0) {
                console.log("Steps: " + steps + "; Paths: " + paths.length + "; Leading Risk: " + leadingRisk + " at " + paths[0].x + "," + paths[0].y + " and length " + Object.keys(paths[0].path).length);
                // console.log(paths[0].path);
            }
            
            // if (steps > 2) break;
            let branch = paths.shift();
            
            // top
            if (riskMap[branch.x + ',' + (branch.y - 1)]) {
                let newBranch = JSON.parse(JSON.stringify(branch));
                if (!newBranch.path[newBranch.x + ',' + newBranch.y]) {
                    newBranch.path[newBranch.x + ',' + newBranch.y] = true;
                    newBranch.x = newBranch.x;
                    newBranch.y = newBranch.y - 1;
                    newBranch.risk = newBranch.risk + riskMap[newBranch.x + ',' + newBranch.y];
                    paths.push(newBranch);
                } // else duplicate route
            }
            // left
            if (riskMap[(branch.x - 1) + ',' + branch.y]) {
                let newBranch = JSON.parse(JSON.stringify(branch));
                if (!newBranch.path[newBranch.x + ',' + newBranch.y]) {
                    newBranch.path[newBranch.x + ',' + newBranch.y] = true;
                    newBranch.x = newBranch.x - 1;
                    newBranch.y = newBranch.y;
                    newBranch.risk = newBranch.risk + riskMap[newBranch.x + ',' + newBranch.y];
                    paths.push(newBranch);
                } // else duplicate route
            }
            // right
            if (riskMap[(branch.x + 1) + ',' + branch.y]) {
                let newBranch = JSON.parse(JSON.stringify(branch));
                if (!newBranch.path[newBranch.x + ',' + newBranch.y]) {
                    newBranch.path[newBranch.x + ',' + newBranch.y] = true;
                    newBranch.x = newBranch.x + 1;
                    newBranch.y = newBranch.y;
                    newBranch.risk = newBranch.risk + riskMap[newBranch.x + ',' + newBranch.y];
                    paths.push(newBranch);
                } // else duplicate route
            }
            // bottom
            if (riskMap[branch.x + ',' + (branch.y + 1)]) {
                let newBranch = JSON.parse(JSON.stringify(branch));
                if (!newBranch.path[newBranch.x + ',' + newBranch.y]) {
                    newBranch.path[newBranch.x + ',' + newBranch.y] = true;
                    newBranch.x = newBranch.x;
                    newBranch.y = newBranch.y + 1;
                    newBranch.risk = newBranch.risk + riskMap[newBranch.x + ',' + newBranch.y];
                    paths.push(newBranch);
                } // else duplicate route
            }

            // Process the path with the lowest risk -- sort by RISK, then within RISK by LONGEST PATH LENGTH
            // Sort less freqently for speed boost?
            if (paths[0].risk > leadingRisk) {
                paths = paths.sort((a, b) => {
                    if (a.risk === b.risk){
                        return Object.keys(a.path).length < Object.keys(b.path).length ? 1 : -1;
                    }
                    return a.risk < b.risk ? -1 : 1;
                });
                leadingRisk = paths[0].risk;
            }

            if (paths[0].x === maxX && paths[0].y === maxY){
                console.log("Found a terminal path!");
                console.log(paths[0]);
                break;
            }
        }
        
        // console.log(paths);
        // console.log(riskMap);

        return paths[0].risk;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

start();



