const fetch = require('../helpers/fetch')
const format = require('../helpers/format')
const file = require('../helpers/file')
const { red, green, yellow } = require('../config/console')
const analysis = require('../helpers/analysis')

module.exports = async params => {

    const repos = await file.read(params.storage)

    for (let index = 0; index < repos.length; index++) {

        try {
            const [owner, name] = repos[index].nameWithOwner.split('/')

            Object.assign(params, { owner, name })

            const node = await fetch.one(params)

            if (node) {
                // await analysis(params)
                // - this function will download and collect metrics from the repository

                const formattedNode = format.one(node)

                await file.save([formattedNode], params.filename)
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