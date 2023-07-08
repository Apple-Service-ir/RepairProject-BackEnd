const Transaction = require("../../models/Transaction")
const zarinpal = require("../../helpers/zarinpal")
const config = require("../../configs/config.json")

const get = async (req, res) => {
    if (!req.body.amount || !req.body.id) return res.status(401).json({ ok: false, err: "paramteres undefined [amount, id]" })

    const findTransaction = await Transaction.findByPk(req.body.id)
    if (!findTransaction) return res.status(401).json({ ok: false, err: "invalid transaction id" })

    if (!findTransaction.price + "" != req.body.amount + "") return res.status(401).json({ ok: false, err: "invalid amount" })

    zarinpal.PaymentVerification({
        Amount: req.body.amount,
        Authority: "000000000000000000000000000000000000"
    }).then(res => {
        if (res.status !== 100) return res.status(401).json({ ok: false, err: "تراکنش ناموفق" })
        res.json({ ok: true })
    }).catch(err => {
        res.status(401).json({ ok: false, err })
    })
}

module.exports = {
    get
}