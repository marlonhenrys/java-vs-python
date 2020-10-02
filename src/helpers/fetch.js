const axios = require('axios')
const queryBuilder = require('../utils/queryBuilder')
const { endpoint, options, variables } = require('../config/request')

module.exports = {
    list: async ({ cursor, perPage, language, count }) => {
        
        const after = cursor ? `"${cursor}"` : null
        const query = queryBuilder.findAll(perPage, after, language.name)

        console.log('\nBuscando dados... ' + `${language.name}: ${count}/${language.amount}`)

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