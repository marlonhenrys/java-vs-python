const download = require('download-git-repo')
const { promisify } = require('util')
const { blue } = require('../config/console')
const { exec } = require('child_process')

const cloneRepository = promisify(download)
const executeCommand = promisify(exec)

module.exports = async ({ name, owner }) => {
    console.log(blue, '\nClonando repositório...')
    await cloneRepository(`${owner}/${name}`, `tmp/repos/${name}`)

    console.log(blue, 'Analisando métricas...')
    const { stdout, stderr } = await executeCommand(``)
}