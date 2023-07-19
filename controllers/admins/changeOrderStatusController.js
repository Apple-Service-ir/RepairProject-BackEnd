const Order = require("../../models/Order")
const Transaction = require("../../models/Transaction")
const config = require("../../configs/config.json")
const sms = require("../../helpers/sms")

const post = async (req, res) => {
    if (!req.body.id || !req.body.status) return res.status(400).json({ ok: false, err: "parameters undefined [id, status, repairmanId]" })

    const findOrder = await Order.findByPk(req.body.id, { include: ['user', 'repairman', 'transactions'] })
    if (!findOrder) return res.status(400).json({ ok: false, err: "order undefined" })

    if (findOrder.status == req.body.status) return res.status(401).json({ ok: false, err: "وضعیت سفارش تکراری می‌باشد." })

    if (findOrder.userId == req.user.id) return res.status(403).json({ ok: false, err: "شما دسترسی برای ایجاد تغییر در سفارش خود ندارید." })

    if (!['pending', 'working', 'done', 'cancelled', 'payment-working', 'payment-done'].includes(req.body.status)) return res.status(400).json({ ok: false, err: "bad status" })

    if (findOrder.status == "pending" && (req.body.status == "working" || req.body.status == "payment-working")) sms.send(`${findOrder.user.firstName};${findOrder.id};`, findOrder.user.phone, config.smsOrder);

    await findOrder.update({ status: req.body.status, adminMessage: req.body.adminMessage || null, ...(['working', 'payment-working'].includes(req.body.status) && { repairmanId: req.body.repairmanId }) })

    if (req.body.status == "cancelled") {
        let findTransactions = await Transaction.findAll({ where: { orderId: req.body.id } })
        findTransactions = findTransactions.filter(transaction => transaction.status != "pending")
        findTransactions.forEach(async transaction => await transaction.update({ status: "cancelled" }))
    }

    if (req.body.status == "pending") {
        let findTransactions = await Transaction.findAll({ where: { orderId: req.body.id } })
        findTransactions = findTransactions.filter(transaction => transaction.status != "pending")
        findTransactions.forEach(async transaction => await transaction.destroy())

        await findOrder.update({ repairmanId: null })
    }

    if (req.body.status.startsWith("payment-")) {
        await Transaction.create({
            price: req.body.price,
            orderId: req.body.id,
            status: "pending"
        })
    }

    res.json({ ok: true, order: findOrder })
}

module.exports = {
    post
}