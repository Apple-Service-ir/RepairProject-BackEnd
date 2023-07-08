const { DataTypes } = require("sequelize")
const db = require("../configs/db")

const Part = db.define("parts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
  },
})

Part.sync()

module.exports = Part