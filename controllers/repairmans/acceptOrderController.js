const Order = require("../../models/Order")
const sms = require("../../helpers/sms")
const config = require("../../configs/config.json")
const Transaction = require("../../models/Transaction")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters undefined [id]" })

    const isUserHaveWorkingOrder = await Order.findOne({ where: { status: "working", repairmanId: req.user.id } })
    if (isUserHaveWorkingOrder) return res.status(401).json({ ok: false, err: "شما یک سفارش در حال اجرا دارید. لطفا وضعیت سفارش قبلی را مشخص کنید." })

    const findOrder = await Order.findByPk(req.body.id, { include: ['user'] })
    if (!findOrder) return res.status(401).json({ ok: false, err: "order id not defined" })

    if (findOrder.status !== "pending") return res.status(401).json({ ok: false, err: "Order is not acceptable for repairmans" })

    let status = "working";

    if (req.body.status && req.body.status == "payment-working")
        status = "payment-working";
    else if (req.body.status)
        return res.status(401).json({ ok: false, err: "unknown status [you can just use payment-working status]" })

    await findOrder.update({ status, repairmanId: req.user.id })
    req.body.status.startsWith("payment-") && await Transaction.create({ price: req.body.price, orderId: findOrder.id, status: "pending" })

    sms.send(`${findOrder.user.firstName};${findOrder.id}`, findOrder.user.phone, config.smsOrder)

    res.json({ ok: true, order: await Order.findByPk(req.body.id, { include: ['user', 'repairman', 'transactions'] }) })
}

module.exports = {
    post
}