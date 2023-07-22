const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const City = db.define("cities", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.TEXT
    }
})

module.exports = City