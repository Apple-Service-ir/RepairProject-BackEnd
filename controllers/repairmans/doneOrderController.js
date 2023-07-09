const Order = require("../../models/Order")
const Transaction = require("../../models/Transaction")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters undefined [id]" })

    const findOrder = await Order.findByPk(req.body.id)
    if (!findOrder) return res.status(401).json({ ok: false, err: "order id invalid" })

    if (findOrder.status == "payment-working") return res.status(401).json({ ok: false, err: "سفارش در انتظار پرداخت می‌باشد." })

    let status = "done";

    if (req.body.status && req.body.status == "payment-done")
        status = "payment-done";
    else if (req.body.status)
        return res.status(401).json({ ok: false, err: "unknown status [you can just use payment-done status]" })

    await findOrder.update({ status })
    req.body.price && await Transaction.create({ price: req.body.price, orderId: findOrder.id, status: "pending" })

    if (status == "done") {
        const allTransactions = await Transaction.findAll({ where: { orderId: findOrder.id } })

        let totalPrice = 0

        allTransactions.forEach(async (transaction, i) => {
            totalPrice += transaction.price
            if (!allTransactions[i + 1]) await findOrder.update({ total: totalPrice })
        })
    }

    res.json({ ok: true, order: await Order.findByPk(req.body.id, { include: ['user', 'repairman', 'transactions'] }) })
}

module.exports = {
    post
}