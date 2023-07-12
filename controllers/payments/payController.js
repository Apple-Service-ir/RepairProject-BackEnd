const zarinpal = require("../../helpers/zarinpal")
const Order = require("../../models/Order")
const config = require("../../configs/config.json")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters not found [id]" })

    const findOrder = await Order.findByPk(req.body.id, { include: ['user', 'transactions'] })
    if (!findOrder) return res.status(401).json({ ok: false, err: "invalid order id" })

    const filtered = findOrder.transactions.filter(s => s.status == "pending")
    if (!filtered[0]) return res.json({ ok: false, err: "have not pending transactions" })
    const amount = filtered.map(s => s.price).reduce((prev, current) => prev + current)

    zarinpal.PaymentRequest({
        Amount: amount,
        CallbackURL: `http://192.168.1.138:5173/payments/done`,
        Description: `تعمیر ${findOrder.phoneName}`,
        Email: "",
        Mobile: findOrder.user.phone
    }).then(async response => {
        if (response.status === 100) {
            await findOrder.update({ authority: response.authority })
            res.json({ ok: true, url: response.url })
        }
    }).catch(err => {
        res.json({ ok: false, err })
    })
}

module.exports = {
    post
}