const Order = require("../../models/Order")
const Transaction = require("../../models/Transaction")
const sms = require("../../helpers/sms")
const config = require("../../configs/config.json")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters undefined [id]" })

    const findOrder = await Order.findByPk(req.body.id, { include: ['user'] })
    if (!findOrder) return res.status(401).json({ ok: false, err: "Order id invalid" })

    await findOrder.update({ status: "pending", repairmanId: null })

    const transactions = await Transaction.findAll({ where: { orderId: findOrder.id } })
    transactions.forEach(async t => await t.update({ status: "cancelled" })) // Complete this section

    sms.send(`${findOrder.user.firstName};${findOrder.id}`, findOrder.user.phone, config.smsCancelOrder)

    res.json({ ok: true, order: await Order.findByPk(req.body.id, { include: ['user', 'repairman'] }) })
}

module.exports = {
    post
}