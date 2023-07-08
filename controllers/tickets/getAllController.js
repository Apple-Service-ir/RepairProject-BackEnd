const Ticket = require("../../models/Ticket")
const { Op } = require("sequelize")

const get = async (req, res) => {
    const query = (req.user.role == "supporter" && req.query.admin == "true")
        ? {
            [Op.or]: [
                { supportId: req.user.id },
                { supportId: null }
            ]
        }
        : { clientId: req.user.id }


    let tickets = (req.user.role == "admin" && req.query.admin == "true")
        ? await Ticket.findAll({ order: [['id', 'DESC']], include: ['messages'] })
        : await Ticket.findAll({ order: [['id', 'DESC']], where: query, include: ['messages'] })

    if (req.query.admin == "true" && req.user.role == "admin") tickets = tickets.filter(ticket => ticket.clientId != req.user.id)

    return res.json({ ok: true, tickets })
}

module.exports = {
    get
}