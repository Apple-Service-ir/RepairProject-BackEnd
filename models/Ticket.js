const { DataTypes } = require("sequelize")
const db = require("../configs/db")

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

const TicketMessages = db.define("ticketMessages", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    text: {
        type: DataTypes.TEXT
    },

    ticketId: {
        type: DataTypes.INTEGER
    },

    senderId: {
        type: DataTypes.INTEGER
    },

    isSupport: {
        type: DataTypes.BOOLEAN
    }
})

Ticket.sync()

Ticket.hasMany(TicketMessages, { as: "messages" })
TicketMessages.belongsTo(Ticket, {
    foreignKey: "ticketId",
    as: "ticket"
})

module.exports = Ticket