const Transaction = require("../../models/Transaction")
const Order = require("../../models/Order")

const post = async (req, res) => {
    if (!req.body.id || !req.body.price) return res.status(401).json({ ok: false, err: "parameters not found [id, price]" })

    const isOrderCorrect = await Order.findByPk(req.body.id)
    if (!isOrderCorrect || isOrderCorrect.status == "cancelled") return res.status(401).json({ ok: false, err: "order is not available" })

    const isOrderHavePendingTransaction = await Transaction.findOne({ where: { orderId: req.body.id, status: "pending" } })

    if (parseInt(req.body.price) == 0) {
        isOrderHavePendingTransaction && await isOrderHavePendingTransaction.destroy()
        await isOrderCorrect.update({ status: isOrderCorrect.status.replace("payment-", "") })
    }
    else {
        isOrderHavePendingTransaction ? await isOrderHavePendingTransaction.update({ price: req.body.price }) : await Transaction.create({ orderId: req.body.id, price: req.body.price })

        !isOrderCorrect.status.includes("payment-") && await isOrderCorrect.update({ status: `payment-${isOrderCorrect.status}` })
    }

    res.json({ ok: true, order: await Order.findByPk(req.body.id, { include: ['user', 'repairman', 'transactions'] }) })
}

module.exports = {
    post
}