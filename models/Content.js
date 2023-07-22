const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Content = db.define("contents", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  group: {
    type: DataTypes.TEXT,
  },

  title: {
    type: DataTypes.TEXT,
  },

  description: {
    type: DataTypes.TEXT
  }
});

module.exports = Content;
