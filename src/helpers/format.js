const dateDiff = require('../utils/dateDiff')
const { blue } = require('../config/console')

module.exports = {
    list: nodes => {
        console.log(blue, '\nFormatando dados...')

        return nodes.map(node => {
            const primaryLanguage = node.primaryLanguage ? node.primaryLanguage.name : 'N/A'
            const nameWithOwner = node.nameWithOwner
            const stars = node.stargazers.totalCount

            const format = {
                nameWithOwner,
                primaryLanguage,
                stars
            }

            return format
        })
    },

    one: node => {
        console.log(blue, '\nProcessando dados...')

        const { forkCount } = node
        const nameWithOwner = node.nameWithOwner
        const starCount = node.stargazers.totalCount
        const watcherCount = node.watchers.totalCount
        const primaryLanguage = node.primaryLanguage ? node.primaryLanguage.name : 'N/A'
        const lifetime = parseInt(dateDiff(node.createdAt) / 365)
        const releasesPerDay = (node.releases.totalCount / dateDiff(node.createdAt)).toFixed(3)

        return {
            'Name with owner': nameWithOwner,
            'Primary language': primaryLanguage,
            'Lifetime (years)': lifetime,
            'Stars': starCount,
            'Releases per day': releasesPerDay,
            'Forks': forkCount,
            'Watchers': watcherCount,
        }
    }
}