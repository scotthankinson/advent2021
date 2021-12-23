"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_17_pt1());
    console.log(solve_dec_17_pt2());
};

module.exports = {
    start
};


const solve_dec_17_pt1 = () => {
    try {
        // target area: x=20..30, y=-10..-5
        // let target = {minX: 20, maxX: 30, minY: -10, maxY: -5};
        // target area: x=56..76, y=-162..-134
        let target = {minX: 56, maxX: 76, minY: -162, maxY: -134};
        // let ball = {xPos: 0, yPos: 0, xVel: 7, yVel: 2, maxHeight: 0, enteredTarget: false};
        let maxHeight = 0;
        for(let y = -1000; y < 1000; y++){
            for(let x = 0; x < 1000; x++){
                let oneBall = {xPos: 0, yPos: 0, xVel: x, yVel: y, xVelStart: x, yVelStart: y, maxHeight: 0, enteredTarget: false};
                for(let i = 0; i < 1000; i++){
                    step(oneBall, target);
                    if (oneBall.enteredTarget) break;
                }
                if (oneBall.enteredTarget && oneBall.maxHeight > maxHeight) {
                    console.log("new best ball: " + JSON.stringify(oneBall));
                    maxHeight = oneBall.maxHeight;
                }
            }
        }

        // 124750 too high -- fat-fingered target range
        return maxHeight;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const step = (ball, target) => {
    // input should be {xPos: #, yPos: #, xVel: #, yVel: #}
    ball.xPos += ball.xVel;
    ball.yPos += ball.yVel;
    if (ball.xVel > 0) ball.xVel -= 1;
    else if (ball.xVel < 0) ball.xVel += 1;
    ball.yVel -= 1;
    if (ball.yPos > ball.maxHeight) ball.maxHeight = ball.yPos;
    if (target.minX <= ball.xPos && target.maxX >= ball.xPos && target.minY <= ball.yPos && target.maxY >= ball.yPos) ball.enteredTarget = true;
}


const solve_dec_17_pt2 = () => {
    try {
        // target area: x=20..30, y=-10..-5
        // let target = {minX: 20, maxX: 30, minY: -10, maxY: -5};
        // target area: x=56..76, y=-162..-134
        let target = {minX: 56, maxX: 76, minY: -162, maxY: -134};
        // let ball = {xPos: 0, yPos: 0, xVel: 7, yVel: 2, maxHeight: 0, enteredTarget: false};
        let maxHeight = 0;
        let validBalls = [];
        for(let y = -1000; y < 1000; y++){
            for(let x = 0; x < 1000; x++){
                let oneBall = {xPos: 0, yPos: 0, xVel: x, yVel: y, xVelStart: x, yVelStart: y, maxHeight: 0, enteredTarget: false};
                for(let i = 0; i < 1000; i++){
                    step(oneBall, target);
                    if (oneBall.enteredTarget) break;
                }
                if (oneBall.enteredTarget) validBalls.push(oneBall);
                if (oneBall.enteredTarget && oneBall.maxHeight > maxHeight) {
                    maxHeight = oneBall.maxHeight;
                }
            }
        }

        // console.log(validBalls.length);
        return validBalls.length;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



