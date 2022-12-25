#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin} = require('yargs/helpers')
const path = require('path');
const fs = require('fs');

const argv = yargs(hideBin(process.argv)).argv

let nameFile = argv._[0]

let content

if (nameFile) {
    file = path.join(__dirname, `${nameFile}.txt`)

    fs.readFile(file, 'utf-8', (err, data) => {
        if (data) {
            content = JSON.parse(data)
            let w = content.logs.filter((i) => i.result === 'won').length
            let l = content.logs.length - w
            console.log(`
             ------------------------------------------
             Всего партий: ${content.logs.length},
             Выигранных партий: ${w},
             Проигранных партий: ${l},
             Процентное соотношение: ${w / l * 100}
             ------------------------------------------
             `)
        }
    })
} else {
    console.log('Вам нужно ввести название файла логов!')
}