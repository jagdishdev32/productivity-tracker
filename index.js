#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let isOnBreak = false;
let log = [];

const getCurrentTime = () => new Date().toISOString();

rl.on('line', (input) => {
    const currentTime = getCurrentTime();

    switch (input.trim().toUpperCase()) {
        case 'T':
            if (isOnBreak) {
                console.log('Break time ended, task time started.');
                log.push({ type: 'BreakEnd', time: currentTime });
                isOnBreak = false;
            } else {
                console.log('Task time logged.');
                log.push({ type: 'Task', time: currentTime });
            }
            break;
        case 'B':
            if (!isOnBreak) {
                console.log('Break time started.');
                log.push({ type: 'BreakStart', time: currentTime });
                isOnBreak = true;
            } else {
                console.log('Already on break.');
            }
            break;
        default:
            console.log('Invalid input. Press "T" for task or "B" for break.');
    }

    // Optional: Save log to file
    fs.writeFileSync('log.json', JSON.stringify(log, null, 2));
});

console.log('Task Timer Started. Press "T" for task or "B" for break.');

