const dateDiff = require('../utils/dateDiff')
const { blue } = require('../config/console')

module.exports = {
    list: (nodes, filters) => {
        console.log(blue, '\nFiltrando dados...')

        return nodes.map(node => {
            const primaryLanguage = node.primaryLanguage ? node.primaryLanguage.name : 'N/A'

            if (primaryLanguage === filters[0].value && filters[0].count > 0 ||
                primaryLanguage === filters[1].value && filters[1].count > 0) {

                const nameWithOwner = node.nameWithOwner
                const stars = node.stargazers.totalCount

                const format = {
                    nameWithOwner,
                    primaryLanguage,
                    stars
                }

                if (primaryLanguage === filters[0].value) filters[0].count--
                if (primaryLanguage === filters[1].value) filters[1].count--

                return format
            }
        }).filter(node => !!node)
    },

    one: node => {
        console.log(blue, '\nProcessando dados...')

        const { forkCount } = node
        const nameWithOwner = node.nameWithOwner
        const starCount = node.stargazers.totalCount
        const releaseCount = node.releases.totalCount
        const watcherCount = node.watchers.totalCount
        const primaryLanguage = node.primaryLanguage ? node.primaryLanguage.name : 'N/A'
        const lifetime = parseInt(dateDiff(node.createdAt) / 365)

        return {
            'Name with owner': nameWithOwner,
            'Primary language': primaryLanguage,
            'Lifetime (years)': lifetime,
            'Stars': starCount,
            'Releases': releaseCount,
            'Forks': forkCount,
            'Watchers': watcherCount,
        }
    }
}