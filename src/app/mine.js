const fetch = require('../helpers/fetch')
const format = require('../helpers/format')
const file = require('../helpers/file')
const { red, green, yellow } = require('../config/console')

module.exports = async params => {

    while (params.lack()) {

        try {
            const { nodes, pageInfo } = await fetch.list(params)

            if (nodes.length) {
                const formattedNodes = format.list(nodes, params.filters)

                if (formattedNodes.length) {
                    await file.save(formattedNodes, params.filename)
                    console.log(green, '\nDados coletados.')

                } else {
                    console.log(yellow, '\nNenhum dado de interesse coletado.')
                }
            }

            if (pageInfo.hasNextPage) {
                params.cursor = pageInfo.endCursor

            } else if (params.lack()) {
                console.log(yellow, '\nNão há mais dados para coletar.')
                console.log(yellow, `\nFaltam ${params.lack()} repositórios.`)
                break
            }

        } catch (error) {
            console.log(red, error.message)
            console.log('\nTentando novamente...')
        }
    }

    console.log(`\nColeta de dados finalizada!\n`)
}