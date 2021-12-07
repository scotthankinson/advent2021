"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_3_pt1());
    console.log(solve_dec_3_pt2());
};

module.exports = {
    start
};


const solve_dec_3_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec3.txt', 'utf8');
        const lines = data.split('\n');

        let gammaRate = '';
        let epsilonRate = '';
        for(let i = 0; i < lines[0].length; i++) {
            let oneCount = 0;
            let zeroCount = 0;
            for(let j = 0; j < lines.length; j++){
                if (lines[j][i] === '0') zeroCount += 1;
                else oneCount += 1;
            }
            if (oneCount > zeroCount) {
                gammaRate = gammaRate + "1";
                epsilonRate = epsilonRate + "0";
            } else {
                gammaRate = gammaRate + "0";
                epsilonRate = epsilonRate + "1";
            }
        }

        console.log(gammaRate + ": " + parseInt(gammaRate, 2));
        console.log(epsilonRate + ": " + parseInt(epsilonRate, 2));

        return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_3_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec3.txt', 'utf8');
        const lines = data.split('\n');

        let oxygens = data.split('\n');
        let oxygen = '';
        let carbons = data.split('\n');
        let carbon = '';

        for(let i = 0; i < lines[0].length; i++) {
            let oneCount = 0;
            let zeroCount = 0;
            for(let j = 0; j < oxygens.length; j++){
                if (oxygens[j][i] === '0') zeroCount += 1;
                else oneCount += 1;
            }

            if (oneCount >= zeroCount && oxygens.length > 1) oxygen = oxygen + "1";
            if (oneCount < zeroCount && oxygens.length > 1) oxygen = oxygen + "0";

            oneCount = 0;
            zeroCount = 0;
            for(let j = 0; j < carbons.length; j++){
                if (carbons[j][i] === '0') zeroCount += 1;
                else oneCount += 1;
            }
            console.log("Zeros: " + zeroCount);
            console.log("Ones: " + oneCount);
            if (zeroCount > oneCount && carbons.length > 1) carbon = carbon + "1";
            if (zeroCount <= oneCount && carbons.length > 1) carbon = carbon + "0";

            console.log("O:" + oxygen);
            console.log("C:" + carbon);
            oxygens = oxygens.filter(o => o.startsWith(oxygen));
            carbons = carbons.filter(o => o.startsWith(carbon));
            console.log(carbons);
            
        }


        console.log(oxygens[0] + ": " + parseInt(oxygens[0], 2));
        console.log(carbons[0] + ": " + parseInt(carbons[0], 2));

        return parseInt(oxygens[0], 2) * parseInt(carbons[0], 2);
    } catch (e) {
            console.log('Error:', e.stack);
    }
    return -1;
}



start();



