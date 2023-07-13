const Order = require("../../models/Order")

const get = async (req, res) => {
    const orders = await Order.findAll({ order: [['id', 'DESC']], include: ['user', 'repairman', 'transactions'] })
    res.json({ ok: true, orders })
}

module.exports = {
    get
}