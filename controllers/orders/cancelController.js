const Order = require("../../models/Order")
const Transaction = require("../../models/Transaction")

const post = async (req, res) => {
    if (!req.body.orderId || req.body.orderId == "") return res.status(400).json({ ok: false, err: "orderId undefined" })

    const findOrder = await Order.findByPk(req.body.orderId)

    if (!findOrder || findOrder.status != "pending") return res.status(406).json({ ok: false, err: "سفارش مورد نظر غیر قابل لغو می‌باشد" })

    const findTransactions = await Transaction.findAll({ where: { orderId: findOrder.id, status: "pending" } })
    findTransactions.forEach(async s => await s.destroy())

    await findOrder.update({ status: "cancelled" })

    req.file && req.file.filename && fs.unlinkSync(`/public/uploads/${findOrder.picture}`);

    const order = await Order.findByPk(findOrder.id, { include: ['repairman', 'user'] })

    res.json({ ok: true, order })
}

module.exports = {
    post
}