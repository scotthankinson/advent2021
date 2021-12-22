"use strict";
// tslint:disable
import fs = require('fs');
import { ObjectFlags } from 'typescript';

const start = (): void => {
    // console.log(solve_dec_14_pt1());
    console.log(solve_dec_14_pt2());
};

module.exports = {
    start
};


const solve_dec_14_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec14.txt', 'utf8');
        const lines = data.split('\n');

        let template = lines.shift();
        lines.shift();
        let rules = {};
        for(let i = 0; i < lines.length; i++){
            let parts = lines[i].split(' -> ');
            rules[parts[0]] = parts[1];
        }

        console.log(template);
        // console.log(rules);
        for(let i = 0; i < 10; i++){
            console.log("Processing expansion " + i);
            let pairs = [];
            for(let j = 1; j < template.length; j++){
                pairs.push(template.substring(j-1, j + 1));
            }
            // console.log(pairs);
            let expansion = template[0];
            while (pairs.length > 0){
                let piece = pairs.shift();
                let insertion = rules[piece];
                expansion = expansion  + insertion + piece[1];
            }
            template = expansion;
            // console.log(template);
            // NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
            // NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
        }
        console.log("Template Length: " + template.length);
        let counts = {};
        let letters = template.split('');
        for(let i = 0; i < letters.length; i++){
            if (counts[letters[i]]){
                counts[letters[i]] += 1;
            } else {
                counts[letters[i]] = 1;
            }
        }
        let values = Object.values(counts).sort((a, b) => a < b ? -1 : 1) as number[];
        return values[values.length - 1] - values[0];
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const solve_dec_14_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec14.txt', 'utf8');
        const lines = data.split('\n');

        let template = lines.shift();
        lines.shift();
        let rules = {};
        for(let i = 0; i < lines.length; i++){
            let parts = lines[i].split(' -> ');
            rules[parts[0]] = {'key': parts[1], 'count': 0};
        }
        Object.keys(rules).forEach(o => {
            let parts = o.split('');
            rules[parts[0]] = 0;
            rules[parts[1]] = 0;
        });
        template.split('').forEach(o => rules[o] += 1);
        
        for(let j = 1; j < template.length; j++){
            let pair = template.substring(j-1, j + 1);
            console.log("Starter Pair: " + pair);
            console.log(pair);
            console.log(rules[pair]);
            rules[pair].count += 1;
        }

        for(let i = 0; i < 40; i++){
            console.log("Processing Step " + i);
            console.log(Object.keys(rules).filter(o => o.length === 1).map(o => rules[o]));
            let newRules = JSON.parse(JSON.stringify(rules));
            Object.keys(newRules).forEach(o => {
                if (o.length > 1) newRules[o].count = 0;
            });
            Object.keys(rules).forEach(o => {
                if (o.length > 1) {
                    let count = rules[o].count;
                    let insert = rules[o].key;
                    newRules[o[0] + insert].count += count;
                    newRules[insert + o[1]].count += count;
                    newRules[insert] += count;
                }
            })
            rules = newRules;
        }

        let values = Object.keys(rules).filter(o => o.length ===1).map(o => rules[o]).sort((a, b) => a < b ? -1 : 1);
        console.log(values);
        return values[values.length - 1] - values[0];
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



