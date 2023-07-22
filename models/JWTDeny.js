const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const JWTDeny = db.define("jwtdenies", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    token: {
        type: DataTypes.STRING
    }
})

module.exports = JWTDeny