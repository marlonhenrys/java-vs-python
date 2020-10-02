const fetch = require('../helpers/fetch')
const format = require('../helpers/format')
const file = require('../helpers/file')
const { red, green, yellow } = require('../config/console')

module.exports = async params => {

    params.count = 0

    while (params.language.amount > params.count) {

        try {
            const { nodes, pageInfo } = await fetch.list(params)

            if (nodes.length) {
                const formattedNodes = format.list(nodes)

                params.count += formattedNodes.length

                await file.save(formattedNodes, params.filename)
                console.log(green, '\nDados coletados.')

            } else {
                console.log(yellow, '\nNenhum dado de interesse coletado.')
            }

            if (pageInfo.hasNextPage) {
                params.cursor = pageInfo.endCursor

            } else if (params.language.amount - params.count > 0) {
                console.log(yellow, '\nNão há mais dados para coletar.')
                console.log(yellow, `Esperava-se mais ${params.language.amount - params.count} repositórios.`)
                break
            }
        } catch (error) {
            console.log(red, error.message)
            console.log('\nTentando novamente...')
        }
    }
    console.log(`\nColeta de dados finalizada!\n`)
}