const Phone = require("../../models/Phone")

const get = async (req, res) => {
    const phones = await Phone.findAll({ attributes: ['id', 'brand', 'model'], order: [['id', 'DESC']] })
    const brands = []

    phones.forEach(phone => { !brands.includes(phone.brand) && brands.push(phone.brand) })

    res.json({ phones, brands })
}

module.exports = { get }