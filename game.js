#!/usr/bin/env node

const readline = require('readline');
const res = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const result = Math.round(Math.random() * 100)

const oneTwo = () => {
    res.question("Загадано число в диапазоне от 0 до 100 ", function(answer) {
        if (result > answer) {
            console.log('Больше')
            oneTwo()
        } else if (result < answer) {
            console.log('Меньше')
            oneTwo()
        } else {
            console.log('ВЫ ОТГАДАЛИ ЗАГАДАННОЕ ЧИСЛО ' + result)
            res.close()
        }
    });
}
oneTwo()