const Ticket = require("../../models/Ticket")
const sms = require("../../helpers/sms")
const TicketMessage = require("../../models/TicketMessage")
const User = require("../../models/User")
const config = require("../../configs/config.json")

const post = async (req, res) => {
  if (!req.body.ticketId || !req.body.text) return res.status(400).json({ ok: false, err: "parameters not defined [ticketId, text]" })

  const isTicketCorrect = await Ticket.findByPk(req.body.ticketId)

  if (!isTicketCorrect || isTicketCorrect.status == "closed") return res.status(406).json({ ok: false, err: "تیکت شما اجازه ارسال پیام ندارد." })

  const isMessageSupport = (!isTicketCorrect.supportId || isTicketCorrect.supportId == req.user.id) && (req.user.role == "supporter" || req.user.role == "admin") && (isTicketCorrect.clientId != req.user.id)

  isMessageSupport ? await isTicketCorrect.update({ supportId: req.user.id, status: "open" }) : await isTicketCorrect.update({ status: "pending" })

  await TicketMessage.create({
    text: req.body.text,
    ticketId: req.body.ticketId,
    senderId: req.user.id,
    isSupport: (isMessageSupport) ? true : false
  })

  const ticket = await Ticket.findByPk(req.body.ticketId, { include: ['messages'] })

  if (!ticket.messages[ticket.messages.length - 2].isSupport && ticket.messages[ticket.messages.length - 1].isSupport) {
    const userInfo = await User.findByPk(isTicketCorrect.clientId)
    sms.send(`${userInfo.firstName};${isTicketCorrect.id};`, userInfo.phone, config.smsTicket)
  }

  res.json({ ok: true, ticket: ticket })
}

module.exports = {
  post
}