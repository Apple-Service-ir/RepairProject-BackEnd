const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Content = db.define("contents", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.TEXT,
  },

  text: {
    type: DataTypes.TEXT,
  },
});

module.exports = Content;
