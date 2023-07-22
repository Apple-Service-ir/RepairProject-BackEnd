const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const TicketMessages = require("./TicketMessage")

const Ticket = db.define("tickets", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    status: {
        type: DataTypes.STRING
    },

    clientId: {
        type: DataTypes.INTEGER
    },

    supportId: {
        type: DataTypes.INTEGER
    },

    subject: {
        type: DataTypes.STRING
    }
})

Ticket.hasMany(TicketMessages, { as: "messages" })
TicketMessages.belongsTo(Ticket, {
    foreignKey: "ticketId",
    as: "ticket"
})

module.exports = Ticket