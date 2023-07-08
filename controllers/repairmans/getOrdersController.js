const Order = require("../../models/Order")
const { Op } = require("sequelize")

const get = async (req, res) => {
    const repairmanOrders = await Order.findAll({
        where: {
            [Op.or]: [
                { repairmanId: req.user.id },
                { repairmanId: null }
            ],
            city: req.user.city
        },

        include: ['user', 'repairman', 'transactions'],
        order: [['id', 'DESC']]
    })
    res.json({ ok: true, orders: repairmanOrders.filter(o => (o.status != "cancelled") && req.user.id != o.userId) })
}

module.exports = {
    get
}