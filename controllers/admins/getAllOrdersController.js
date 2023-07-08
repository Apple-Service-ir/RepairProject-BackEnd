const Order = require("../../models/Order")

const get = async (req, res) => {
    const orders = await Order.findAll({ order: [['id', 'DESC']], include: ['user', 'repairman'] })
    res.json({ ok: true, orders })
}

module.exports = {
    get
}