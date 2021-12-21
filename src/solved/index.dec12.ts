"use strict";
// tslint:disable
import fs = require('fs');
import { indexOf } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_12_pt1());
    console.log(solve_dec_12_pt2());
};

module.exports = {
    start
};


const solve_dec_12_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec12.txt', 'utf8');
        const lines = data.split('\n');

        let paths = {};
        for(let i = 0; i < lines.length; i++){
            let parts = lines[i].split('-');
            if (paths[parts[0]]) paths[parts[0]].push(parts[1]);
            else paths[parts[0]] = [parts[1]];
            if (paths[parts[1]]) paths[parts[1]].push(parts[0]);
            else paths[parts[1]] = [parts[0]];
        }

        let routes = ['start'];
        let successfulRoutes = [];
        while (routes.length > 0){
            console.log("Possibilities: " + routes.length);
            let route = routes.shift();
            let position = route.split('-').pop();
            if (paths[position]) {
                for(let i = 0; i < paths[position].length; i++){
                    let next = paths[position][i];
                    // Lowercase letter, second occurrence in the route
                    if ((route.indexOf("-" + next) >= 0 && next !== next.toUpperCase()) || next === 'start'){
                        console.log("Discarding route " + route + " ending in duplicate " + next);
                        continue;
                    }
                    if (next === 'end') {
                        console.log("Successful route " + route + '-' + next);
                        successfulRoutes.push(route + '-' + next);
                    } else {
                        routes.push(route + '-' + next);
                    }
                }
            } else routes.push(route);
        }

        
        successfulRoutes = successfulRoutes.sort((a, b) => a < b ? 1 : -1);
        for(let i = 0; i < successfulRoutes.length; i++){
            console.log(successfulRoutes[i]);
        }
        console.log(paths);
        // 605 too low -- rt is contained in start, need to dupe-check on -rt
        // 4338
        return successfulRoutes.length;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const solve_dec_12_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec12.txt', 'utf8');
        const lines = data.split('\n');

        let paths = {};
        for(let i = 0; i < lines.length; i++){
            let parts = lines[i].split('-');
            if (paths[parts[0]]) paths[parts[0]].push(parts[1]);
            else paths[parts[0]] = [parts[1]];
            if (paths[parts[1]]) paths[parts[1]].push(parts[0]);
            else paths[parts[1]] = [parts[0]];
        }

        let routes = ['start'];
        let successfulRoutes = [];
        while (routes.length > 0){
            console.log("Possibilities: " + routes.length);
            let route = routes.shift();
            let position = route.split('-').pop();
            if (paths[position]) {
                for(let i = 0; i < paths[position].length; i++){
                    let next = paths[position][i];
                    // Lowercase letter, second occurrence in the route
                    if ((route.indexOf("-" + next) >= 0 && next !== next.toUpperCase()) || next === 'start') {
                        // allow one dupe through
                        if (route.startsWith('dupe') || next === 'start' || next === 'end') {
                            console.log("Discarding route " + route + " ending in duplicate " + next);
                            continue;
                        }
                        routes.push('dupe-' + route + '-' + next);
                        continue;
                    }
                    if (next === 'end') {
                        console.log("Successful route " + route + '-' + next);
                        successfulRoutes.push(route + '-' + next);
                    } else {
                        routes.push(route + '-' + next);
                    }
                }
            } else routes.push(route);
        }

        
        successfulRoutes = successfulRoutes.sort((a, b) => a < b ? 1 : -1);
        for(let i = 0; i < successfulRoutes.length; i++){
            console.log(successfulRoutes[i]);
        }
        console.log(paths);
        // 605 too low -- rt is contained in start, need to dupe-check on -rt
        // 4338
        return successfulRoutes.length;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



/*
nu-start
rt-start
db-qh
PE-end
sl-rt
qh-end
ZH-rt
nu-rt
PE-db
db-sl
nu-ZH
nu-qh
PE-qh
ZH-db
ne-end
ne-ZH
QG-db
qh-sl
ZH-qh
start-ZH
nu-PE
uf-db
ne-sl



start - [ZH, nu, rt]

{
  nu: [ 'start', 'rt', 'ZH', 'qh', 'PE' ],
  start: [ 'nu', 'rt', 'ZH' ],
  rt: [ 'start', 'sl', 'ZH', 'nu' ],
  db: [ 'qh', 'PE', 'sl', 'ZH', 'QG', 'uf' ],
  qh: [ 'db', 'end', 'nu', 'PE', 'sl', 'ZH' ],
  PE: [ 'end', 'db', 'qh', 'nu' ],
  end: [ 'PE', 'qh', 'ne' ],
  sl: [ 'rt', 'db', 'qh', 'ne' ],
  ZH: [ 'rt', 'nu', 'db', 'ne', 'qh', 'start' ],
  ne: [ 'end', 'ZH', 'sl' ],
  QG: [ 'db' ],
  uf: [ 'db' ]
}
*/

