"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    console.log(solve_dec_16_pt1());
    // console.log(solve_dec_16_pt2());
};

module.exports = {
    start
};

let globalVersion = 0;
let globalSequence = [];

const solve_dec_16_pt1 = () => {
    try {
        // let data = fs.readFileSync('src/test.dec16.txt', 'utf8');
        // const lines = data.split('\n');
        // let input = 'D2FE28'; // Literal
        // let input = '9C0141080250320F1802104A08'; // Operator
        let input = '620D79802F60098803B10E20C3C1007A2EC4C84136F0600BCB8AD0066E200CC7D89D0C4401F87104E094FEA82B0726613C6B692400E14A305802D112239802125FB69FF0015095B9D4ADCEE5B6782005301762200628012E006B80162007B01060A0051801E200528014002A118016802003801E2006100460400C1A001AB3DED1A00063D0E25771189394253A6B2671908020394359B6799529E69600A6A6EB5C2D4C4D764F7F8263805531AA5FE8D3AE33BEC6AB148968D7BFEF2FBD204CA3980250A3C01591EF94E5FF6A2698027A0094599AA471F299EA4FBC9E47277149C35C88E4E3B30043B315B675B6B9FBCCEC0017991D690A5A412E011CA8BC08979FD665298B6445402F97089792D48CF589E00A56FFFDA3EF12CBD24FA200C9002190AE3AC293007A0A41784A600C42485F0E6089805D0CE517E3C493DC900180213D1C5F1988D6802D346F33C840A0804CB9FE1CE006E6000844528570A40010E86B09A32200107321A20164F66BAB5244929AD0FCBC65AF3B4893C9D7C46401A64BA4E00437232D6774D6DEA51CE4DA88041DF0042467DCD28B133BE73C733D8CD703EE005CADF7D15200F32C0129EC4E7EB4605D28A52F2C762BEA010C8B94239AAF3C5523CB271802F3CB12EAC0002FC6B8F2600ACBD15780337939531EAD32B5272A63D5A657880353B005A73744F97D3F4AE277A7DA8803C4989DDBA802459D82BCF7E5CC5ED6242013427A167FC00D500010F8F119A1A8803F0C62DC7D200CAA7E1BC40C7401794C766BB3C58A00845691ADEF875894400C0CFA7CD86CF8F98027600ACA12495BF6FFEF20691ADE96692013E27A3DE197802E00085C6E8F30600010882B18A25880352D6D5712AE97E194E4F71D279803000084C688A71F440188FB0FA2A8803D0AE31C1D200DE25F3AAC7F1BA35802B3BE6D9DF369802F1CB401393F2249F918800829A1B40088A54F25330B134950E0';
        let binInput = input.split('').map(o => {
            if (o === '0') return '0000';
            if (o === '1') return '0001';
            if (o === '2') return '0010';
            if (o === '3') return '0011';
            if (o === '4') return '0100';
            if (o === '5') return '0101';
            if (o === '6') return '0110';
            if (o === '7') return '0111';
            if (o === '8') return '1000';
            if (o === '9') return '1001';
            if (o === 'A') return '1010';
            if (o === 'B') return '1011';
            if (o === 'C') return '1100';
            if (o === 'D') return '1101';
            if (o === 'E') return '1110';
            if (o === 'F') return '1111';
        }).join('');
        
        console.log(binInput);
        processPacket(binInput);  
        // TODO: PREFIX processing the array of instructions in globalSequence
        
        for(let i = 0; i < globalSequence.length; i++){
            console.log(globalSequence[i]);
        }
        let problem = compose(globalSequence);
        while(problem.indexOf("(") >= 0){
            problem = simplify(problem);
            console.log(problem.length);
        }
        console.log(problem);

        return globalVersion;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const compose = (input) => {
    let problemStatement = '';
    let numbers = 0;
    input.forEach(o => {       
        if (0 + parseInt(o) > 0) {
            problemStatement = problemStatement + o + ',';
            numbers += 1;
        } else if (o === ")") {
            problemStatement = problemStatement + o + ',';
        } else {
            problemStatement = problemStatement + o;
        }
    });
    for(let i = 0; i < numbers; i++){
        problemStatement = problemStatement.replace(',)', ')');
    }
    problemStatement = problemStatement.substr(0, problemStatement.length - 1);
    console.log(problemStatement);
    return problemStatement;
}

const simplify = (input) => {
    console.log(input.length);
    let openIndexes = [];
    let opens = input.split('(');
    let pos = 0;
    for(let i = 0; i < opens.length; i++){
        pos += opens[i].length;
        openIndexes.push(pos);
        pos += 1;
    }
    openIndexes.pop();
    let segments = [];

    for(let j = 0; j < openIndexes.length; j++){
        let depth = 1; // pulled off starting '('
        let segmentEnd = 0;
        for(let i = openIndexes[j] + 1; i < input.length; i++){
            if (input[i] === '(') depth += 1;
            if (input[i] === ')') depth -= 1;
            if (depth === 0){
                segmentEnd = i;
                break;
            }
        }
        segments.push(input.substring(openIndexes[j] - 1, segmentEnd + 1));
        console.log(segments.length);
    }
    for(let i = 0; i < segments.length; i++){
        if (segments[i].split('(').length === 2){
            let evalString = '';
            if (segments[i].startsWith('+')) {
                evalString = "add('"+ segments[i].substring(2, segments[i].length - 1) + "')";
            } else if (segments[i].startsWith('*')) {
                evalString = "product('" + segments[i].substring(2, segments[i].length - 1) + "')";
            } else if (segments[i].startsWith('n')) {
                evalString = "min('" + segments[i].substring(2, segments[i].length - 1) + "')";
            } else if (segments[i].startsWith('x')) {
                evalString = "max('" + segments[i].substring(2, segments[i].length - 1) + "')";
            } else if (segments[i].startsWith('<')) {
                evalString = "lt('" + segments[i].substring(2, segments[i].length - 1) + "')";
            } else if (segments[i].startsWith('>')) {
                evalString = "gt('" + segments[i].substring(2, segments[i].length - 1) + "')";
            } else if (segments[i].startsWith('=')) {
                evalString = "eq('" + segments[i].substring(2, segments[i].length - 1) + "')";
            }
            let result = eval(evalString);
            input = input.replace(segments[i], result);
        }
    }
    return input;
}

const add = (input) => {
    let sum = 0;
    input.split(',').map(o => parseInt(o)).forEach(o => sum += o);
    console.log("add " + input + " = " + sum);
    return sum;
}

const product = (input) => {
    let values = input.split(',');
    let result = parseInt(values[0]);

    if (values.length === 1) return result;
    for(let i = 1; i < values.length; i++) {
        result = result * parseInt(values[i]);
    }
    console.log("product " + input + " = " + result);
    return result;
}

const min = (input) => {
    let values = input.split(',').map(o => parseInt(o));
    values.sort((a, b) => a < b ? -1 : 1);
    console.log("min " + input + " = " + values[0]);
    return values[0];
}

const max = (input) => {
    let values = input.split(',').map(o => parseInt(o));
    values.sort((a, b) => a < b ? 1 : -1);
    console.log("max " + input + " = " + values[0]);
    return values[0];
}

const lt = (input) => {
    let values = input.split(',').map(o => parseInt(o));
    console.log("lt " + input + " = " + (values[0] < values[1]));
    return values[0] < values[1] ? 1 : 0;
}

const gt = (input) => {
    let values = input.split(',').map(o => parseInt(o));
    console.log("gt " + input + " = " + (values[0] > values[1]));
    return values[0] > values[1] ? 1 : 0;
}

const eq = (input) => {
    let values = input.split(',').map(o => parseInt(o));
    console.log("eq " + input + " = " + (values[0] === values[1]));
    return values[0] === values[1] ? 1 : 0;
}

const processPacket = (input) => {
    let startLength = input.length;
    if (input.length === 0) return '';
    let version = parseInt(input.substring(0,3), 2);
    console.log('Version: ' + version);
    globalVersion += version;
    input = input.substring(3);
    let type = parseInt(input.substring(0,3), 2);
    console.log('Type: ' + type);
    input = input.substring(3);
    if (type === 4) {
        input = resolveLiteral(input);
    }
    else {
        if (type === 0) globalSequence.push('+');   // add
        if (type === 1) globalSequence.push('*');   // product
        if (type === 2) globalSequence.push('n');   // min
        if (type === 3) globalSequence.push('x');   // max
        if (type === 5) globalSequence.push('>');   // greater than
        if (type === 6) globalSequence.push('<');   // less than
        if (type === 7) globalSequence.push('=');   // equals
        input = resolveOperator(input);
    }

    let endLength = input.length;
    if (startLength === endLength) return '';
    
    return input;
};

const resolveLiteral = (input) => {
    let literal = '';
    while(input[0] === '1'){
        literal += input.substring(1, 5);
        input = input.substring(5);
    }
    literal += input.substring(1, 5);
    input = input.substring(5);
    console.log("Literal: " + parseInt(literal, 2));
    globalSequence.push('' + parseInt(literal, 2));
    return input;
}

const resolveOperator = (input) => {
    let typeID = input[0];
    input = input.substring(1);
    if (typeID === '0') {
        // Next 15 bits are a number, total bits of all packets
        let bits = parseInt(input.substring(0,15),2);
        input = input.substring(15);
        console.log("TypeID 0 - " + bits + " bits to follow");
        let segment = input.substring(0, bits);
        console.log("Processing segment of " + segment.length);
        globalSequence.push('(');
        while (segment.length > 0){
            segment = processPacket(segment);
        }
        globalSequence.push(')');
        input = input.substring(bits);
    } else {
        // Next 11 bits are the number of of sub-packets
        let bits = parseInt(input.substring(0,11),2);
        input = input.substring(11);
        console.log("TypeID 1 - " + bits + " packets to follow");
        globalSequence.push('(');
        for(let i = 0; i < bits; i++) {
            input = processPacket(input);
        }
        globalSequence.push(')');
    }
    return input;
}


const solve_dec_16_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec16.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


start();



