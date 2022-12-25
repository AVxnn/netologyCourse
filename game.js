#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin} = require('yargs/helpers')
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const argv = yargs(hideBin(process.argv)).argv

const res = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const result = Math.round(Math.random() + 1)

let nameFile = argv._[0]

let content = {
    logs: []
}

let file

if (nameFile) {
    file = path.join(__dirname, `${nameFile}.txt`)

    fs.access(`./${nameFile}.txt`, fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(file, '', (err) => {
                if (err) console.log('')
            })
        }
    })
    fs.readFile(file, 'utf-8', (err, data) => {
        if (data) {
            content = JSON.parse(data)
            console.log(JSON.parse(data))
        }
    })
}

const oneTwo = () => {
    res.question("1 или 2? ", function(answer) {
        if (+answer === 1  || +answer === 2) {
            if (result === +answer) {
                console.log('Вы угадали это было число ', result)
                content.logs.push({number: content.logs.length, player: answer, game: result, result: 'won'})
                res.close()
            }
            if (result !== +answer) {
                console.log('Вы не угадали попробуйте еще раз')
                console.log(result, answer)
                content.logs.push({number: content.logs.length, player: answer, game: result, result: 'lost' })
                res.close()
            }
            if (nameFile) {
                fs.writeFile(file, JSON.stringify(content), (err) => {
                    if (err) console.log('')
                })
            }
            content = {
                logs: []
            }
        } else {
            console.log('Вы ввели не правильное значение!')
            return oneTwo()
        }

    });
}
oneTwo()