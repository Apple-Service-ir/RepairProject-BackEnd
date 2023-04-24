const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Code = db.define("codes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  code: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Code;
