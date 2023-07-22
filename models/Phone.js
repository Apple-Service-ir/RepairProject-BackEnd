const { DataTypes } = require("sequelize")
const db = require("../configs/db.js")

const Phone = db.define("phones", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  brand: {
    type: DataTypes.TEXT
  },

  model: {
    type: DataTypes.TEXT
  }
})

module.exports = Phone