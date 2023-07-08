const Part = require("../../models/Part")

const get = async (req, res) => {
    const products = await Part.findAll({ attributes: ['id', 'name'], order: [['id', 'DESC']] })

    return res.json(products)
}

module.exports = { get }