const download = require('download-git-repo')
const { promisify } = require('util')
const { blue, red, yellow } = require('../config/console')
const { exec } = require('child_process')

const cloneRepository = promisify(download)
const executeCommand = promisify(exec)

module.exports = async ({ nameWithOwner, defaultBranchRef }) => {
    
    const [, name] = nameWithOwner.split('/')
    const path = `tmp/${name}`

    try {
        console.log(blue, '\nBaixando repositório...')
        await cloneRepository(`${nameWithOwner}#${defaultBranchRef.name}`, path)
    } catch (error) {
        console.log(red, error.message)
        console.log(yellow, '\nProsseguindo...\n')
    }

    console.log(blue, 'Coletando métricas...')
    const { stdout } = await executeCommand(`sloc ${path} --keys total,source,comment`)
    
    const output = stdout.replace(/\D/gim, ' ').split(' ').filter(e => e)

    const result = {
        total: parseInt(output[0]),
        source: parseInt(output[1]),
        comments: parseInt(output[2])
    }

    console.log(blue, 'Excluindo repositório...')
    await executeCommand(`cd tmp && rmdir /Q /S ${name}`)

    return result
}