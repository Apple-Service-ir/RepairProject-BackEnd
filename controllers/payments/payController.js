const Transaction = require("../../models/Transaction")
const zarinpal = require("../../helpers/zarinpal")
const Order = require("../../models/Order")
const config = require("../../configs/config.json")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters not found [id]" })

    const findTransaction = await Transaction.findByPk(req.body.id)
    if (!findTransaction) return res.status(401).json({ ok: false, err: "invalid transaction id" })

    const findOrder = await Order.findByPk(findTransaction.orderId, { include: ['user'] })
    if (!findOrder) return res.status(401).json({ ok: false, err: "invalid order id" })

    zarinpal.PaymentRequest({
        Amount: findTransaction.price + "",
        CallbackURL: `${config.mainURL}/payment/done`,
        Description: `تعمیر ${findOrder.phoneName}`,
        Email: "",
        Mobile: findOrder.user.phone
    }).then(res => {
        if (response.status === 100) res.json({ ok: true, url: response.url })
    }).catch(err => {
        res.json({ ok: false, err })
    })
}

module.exports = {
    post
}