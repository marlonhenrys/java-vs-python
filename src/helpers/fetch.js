const axios = require('axios')
const queryBuilder = require('../utils/queryBuilder')
const { endpoint, options, variables } = require('../config/request')

const progress = (totalCount, filters) => {
    const diff = index => totalCount / 2 - filters[index].count
    return `${filters[0].value}: ${diff(0)} | ${filters[1].value}: ${diff(1)}`
}

module.exports = {
    list: async ({ cursor, perPage, totalCount, filters }) => {
        const after = cursor ? `"${cursor}"` : null
        const query = queryBuilder.findAll(perPage, after)

        console.log('\nBuscando dados... ' + `(${progress(totalCount, filters)})`)

        const response = await axios.post(endpoint, { query, variables }, options)
        const { nodes, pageInfo } = response.data.data.search

        return { nodes, pageInfo }
    },

    one: async ({ owner, name }) => {
        const query = queryBuilder.findOne(name, owner)

        console.log('\nBuscando dados... ' + `(${owner} | ${name})`)

        const response = await axios.post(endpoint, { query, variables }, options)
        const { repository } = response.data.data

        return repository
    }
}