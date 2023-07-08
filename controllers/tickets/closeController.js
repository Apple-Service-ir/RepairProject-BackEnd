const Ticket = require("../../models/Ticket")

const post = async (req, res) => {
    if (!req.body.id) return res.status(400).json({ ok: false, err: "parameters not found [id]" })

    const ticketRoom = await Ticket.findByPk(req.body.id)

    if (!ticketRoom) return res.status(404).json({ ok: false, err: "تیکت مورد نظر یافت نشد." })

    await ticketRoom.update({ status: "closed" })

    res.json({ ok: true })
}

module.exports = { post }