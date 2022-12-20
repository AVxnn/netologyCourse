#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

// АРГУМЕНТЫ КОМАНДНОЙ СТРОКИ

const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: 'boolean',
        description: 'current year',
        default: false
    })
    .option('month', {
        alias: 'm',
        type: 'boolean',
        description: 'current month',
        default: false
    })
    .option('date', {
        alias: 'd',
        type: 'boolean',
        description: 'current date',
        default: false
    })
    .argv

let result = null

if (argv.y || argv.year) {
    result = new Date().getUTCFullYear() - argv._[0]
} else if (argv.m || argv.month) {
    result = new Date().getUTCMonth() - argv._[0]
} else if (argv.d || argv.date) {
    result = new Date().getUTCDate() - argv._[0]
} else {
    result = new Date()
}
console.log(result)