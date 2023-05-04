const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Order = db.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  repairmanId: {
    type: DataTypes.INTEGER,
  },

  userId: {
    type: DataTypes.INTEGER,
  },

  location: {
    type: DataTypes.TEXT,
  },

  total: {
    type: DataTypes.INTEGER,
  },

  address: {
    type: DataTypes.TEXT,
  },

  phoneId: {
    type: DataTypes.INTEGER,
  },

  productId: {
    type: DataTypes.INTEGER,
  },

  status: {
    type: DataTypes.TEXT,
  },

  repairTime: {
    type: DataTypes.TEXT,
  },

  userRate: {
    type: DataTypes.INTEGER,
  },

  repairmanRate: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Order;
