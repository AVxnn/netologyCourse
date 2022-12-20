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

const current = () => {
    if (argv.y || argv.year) {
        result = new Date().getUTCFullYear()
    } else if (argv.m || argv.month) {
        result = new Date().getUTCMonth()
    } else if (argv.d || argv.date) {
        result = new Date().getUTCDate()
    } else {
        result = new Date()
    }
}
const sub = (item) => {
    if (argv.y || argv.year) {
        result = new Date().getUTCFullYear() - item
    } else if (argv.m || argv.month) {
        result = new Date().getUTCMonth() - item
    } else if (argv.d || argv.date) {
        result = new Date().getUTCDate() - item
    } else {
        result = new Date()
    }
}
const add = (item) => {
    if (argv.y || argv.year) {
        result = new Date().getUTCFullYear() + item
    } else if (argv.m || argv.month) {
        result = new Date().getUTCMonth() + item
    } else if (argv.d || argv.date) {
        result = new Date().getUTCDate() + item
    } else {
        result = new Date()
    }
}

if (argv.$0 == 'current') {
    current()
} else if (argv.$0 == 'sub') {
    sub(argv._[0])
} else if (argv.$0 == 'add') {
    add(argv._[0])
}

console.log(result)
