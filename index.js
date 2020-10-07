const { filename, perPage, initial } = require('./src/config/params')
const mine = require('./src/app/mine')
const analyze = require('./src/app/analyze')
const argv = require('minimist')

const args = argv(process.argv.slice(2))

const params = {
    perPage: args.l || perPage,
    filename: args.f || args.mine && filename.mine || args.analyze && filename.analyze,
    storage: args.s || filename.mine,
    initial: args.i ? (args.i - 2) : initial,
    language: {
        name: args.n,
        amount: args.a,
    }
}

args.mine
    ? params.language.name
        ? params.language.amount
            ? mine(params)
            : console.log('Informe a quantidade de repositórios com a flag (-a)')
        : console.log('Informe o nome da linguagem com a flag (-n)')
    : args.analyze
        ? analyze(params)
        : console.log('Informe a função a ser executada (--mine ou --analyze)')

