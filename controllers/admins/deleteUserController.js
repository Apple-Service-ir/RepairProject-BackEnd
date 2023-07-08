const User = require("../../models/User.js")
const Ticket = require("../../models/Ticket.js")
const TicketMessage = require("../../models/TicketMessage.js")
const Order = require("../../models/Order.js")

const post = async (req, res) => {
    if(!req.body.id) return res.status(400).json({ok: false, err : "parameters undefined [id]"})

    const findUser = await User.findByPk(req.body.id)
    if(!findUser) return res.status(400).json({ok : false, err : "user is not defined"})

    // Delete tickets for user
    const userTickets = await Ticket.findAll({where : {clientId : findUser.id}})

    userTickets.forEach(async ticket => {
        const ticketMessages = await TicketMessage.findAll({where :{ticketId : ticket.id}})
        ticketMessages.forEach(async ticketMsg => {
            await ticketMsg.destroy()
        })
        await ticket.destroy()
    })

    // Delete pending orders for user
    const userOrders = await Order.findAll({where : {userId : findUser.id, status : "pending"}})

    userOrders.forEach(async order => {
        await order.destroy()
    })

    // Delete user
    await findUser.destroy()
    res.json({ok: true})
}

module.exports = {
    post
}