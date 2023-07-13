const Order = require("../../models/Order")
const config = require("../../configs/config.json")
const sms = require("../../helpers/sms")

const post = async (req, res) => {
    if (!req.body.id || !req.body.status) return res.status(400).json({ ok: false, err: "parameters undefined [id, status]" })

    const findOrder = await Order.findByPk(req.body.id, { include: ['user'] })
    if (!findOrder) return res.status(400).json({ ok: false, err: "order undefined" })

    if (findOrder.userId == req.user.id) return res.status(403).json({ ok: false, err: "شما دسترسی برای ایجاد تغییر در سفارش خود ندارید." })

    if (!['pending', 'working', 'done', 'cancelled'].includes(req.body.status)) return res.status(400).json({ ok: false, err: "bad status" })

    if (findOrder.status == "pending" && req.body.status == "working") sms.send(`${findOrder.user.firstName};${findOrder.id};`, findOrder.user.phone, config.smsOrder);

    await findOrder.update({ status: req.body.status, adminMessage: req.body.adminMessage || null })

    res.json({ ok: true })
}

module.exports = {
    post
}