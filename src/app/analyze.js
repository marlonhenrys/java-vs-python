const fetch = require('../helpers/fetch')
const format = require('../helpers/format')
const file = require('../helpers/file')
const { red, green, yellow } = require('../config/console')
const analysis = require('../helpers/analysis')

module.exports = async params => {
    const repos = await file.read(params.storage)
    let index = params.initial

    for (index; index < repos.length; index++) {

        try {
            const [owner, name] = repos[index].nameWithOwner.split('/')
            Object.assign(params, { owner, name })
            const node = await fetch.one(params)

            if (node) {
                const metrics = await analysis(node)
                const formattedData = format.one(node, metrics)

                await file.save([formattedData], params.filename)
                console.log(green, '\nDados coletados.')

            } else {
                console.log(yellow, '\nRepositório não encontrado.')
            }

        } catch (error) {
            console.log(red, error.message)
            console.log('\nTentando novamente...')
            index--
        }
    }

    console.log(`\nAnálise de repositórios finalizada!\n`)
}