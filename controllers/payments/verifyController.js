const Transaction = require("../../models/Transaction")
const Order = require("../../models/Order")
const zarinpal = require("../../helpers/zarinpal")

const post = async (req, res) => {
    if (!req.body.authority) return res.status(401).json({ ok: false, err: "paramteres undefined [authority]" })

    const findOrder = await Order.findOne({ where: { authority: req.body.authority }, include: ['user', 'transactions', 'repairman'] })
    if (!findOrder) return res.status(401).json({ ok: false, err: "invalid authority" })

    const filtered = findOrder.transactions.filter(s => s.status == "pending")
    if (!filtered[0]) return res.json({ ok: false, err: "have not pending transactions" })
    const amount = filtered.map(s => s.price).reduce((prev, current) => prev + current)

    zarinpal.PaymentVerification({
        Amount: amount,
        Authority: req.body.authority
    }).then(async response => {
        if (response.status !== 100) return res.status(401).json({ ok: false, err: "تراکنش ناموفق", order: findOrder })
        await findOrder.update({ status: findOrder.status.replace("payment-", ""), total: findOrder.total + amount })
        const findTransactions = await Transaction.findAll({ where: { orderId: findOrder.id, status: "pending" } })
        findTransactions.forEach(async s => { await s.update({ status: "done", authority: req.body.authority }) })
        res.json({ ok: true, order: findOrder })
    }).catch(err => {
        res.status(401).json({ ok: false, err, })
    })
}

module.exports = {
    post
}