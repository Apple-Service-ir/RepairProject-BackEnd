const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const TicketMessage = db.define("ticketMessages", {
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

TicketMessage.sync()

module.exports = TicketMessage