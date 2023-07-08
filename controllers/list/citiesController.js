const City = require("../../models/City")

const get = async (req, res) => {
    const cities = await City.findAll({ attributes: ['id', 'name'], order: [['id', 'DESC']] })

    res.json(cities)
}

module.exports = {
    get
}