const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

// АРГУМЕНТЫ КОМАНДНОЙ СТРОКИ

const argv = yargs(hideBin(process.argv))
    .option('params1', {
        alias: 'p1',
        type: 'boolean',
        description: 'params 1 description'
    })
    .option('params2', {
        alias: 'p2',
        type: 'string',
        description: 'params 2 description',
        default: "def params 2"
    })
    .argv



console.log(argv)
