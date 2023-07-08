const Ticket = require("../../models/Ticket")
const TicketMessage = require("../../models/TicketMessage")

const post = async (req, res) => {
    if (!req.body.subject || !req.body.text) return res.status(400).json({ ok: false, err: "parameters not found [subject, text]" })

    const ticket = await Ticket.create({
        status: "pending",
        clientId: req.user.id,
        subject: req.body.subject
    })

    await TicketMessage.create({
        text: req.body.text,
        ticketId: ticket.id,
        senderId: req.user.id
    })

    const tickets = await Ticket.findAll({ where: { clientId: req.user.id }, order: [['id', 'DESC']], include: ['messages'] })

    res.json({ ok: true, tickets })
}

module.exports = {
    post
}