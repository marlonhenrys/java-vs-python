const download = require('download-git-repo')
const { promisify } = require('util')
const { blue } = require('../config/console')

const cloneRepository = promisify(download)

module.exports = async ({ name, owner }) => {
    console.log(blue, '\nClonando repositório...')

    await cloneRepository(`${owner}/${name}`, `tmp/repos/${name}`)

    console.log(blue, 'Analisando métricas...')
}