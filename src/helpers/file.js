const ObjectsToCsv = require('objects-to-csv')
const readCsv = require('neat-csv');
const { blue } = require('../config/console')
const fs = require('fs').promises

module.exports = {
    save: async (list, filename) => {
        console.log(blue, 'Salvando no arquivo...')

        const csv = new ObjectsToCsv(list)

        await csv.toDisk(`./files/${filename}.csv`, { append: true })
    },

    read: async filename => {
        console.log('\nCarregando lista de repositórios...')

        const file = await fs.readFile(`./files/${filename}.csv`)

        return readCsv(file)
    }
}