const db = require("../configs/db")
const { DataTypes } = require("sequelize")

const Transaction = db.define("transactions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    price: {
        type: DataTypes.INTEGER
    },

    orderId: {
        type: DataTypes.INTEGER
    },

    status: {
        type: DataTypes.TEXT,
        defaultValue: "pending"
    },

    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Transaction