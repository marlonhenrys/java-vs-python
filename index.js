const standard = require('./src/config/params')
const mine = require('./src/app/mine')
const analyze = require('./src/app/analyze')
const argv = require('minimist')
const { filters } = require('./src/config/params')

const args = argv(process.argv.slice(2))

const params = {
    perPage: args.l || standard.perPage,
    filename: args.f || args.mine ? standard.filename.mine : standard.filename.analyze,
    storage: args.s || standard.filename.mine,
    filters: [
        {
            value: args.val1 || standard.filters[0].value,
            count: args.cnt2 || standard.filters[0].count,
        },
        {
            value: args.val2 || standard.filters[1].value,
            count: args.cnt2 || standard.filters[1].count,
        }
    ],
    totalCount: filters[0].count + filters[1].count,
    lack: function () { return this.filters[0].count + this.filters[1].count }
}

if (args.mine) mine(params)
else if (args.analyze) analyze(params)
else console.log('Informe a função a ser executada (--mine ou --analyze)')
