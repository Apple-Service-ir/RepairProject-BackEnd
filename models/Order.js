const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const User = require("./User")
const Transactions = require("./Transaction")

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

  address: {
    type: DataTypes.TEXT
  },

  total: {
    type: DataTypes.INTEGER,
  },

  address: {
    type: DataTypes.TEXT,
  },

  city: {
    type: DataTypes.TEXT
  },

  phoneId: {
    type: DataTypes.INTEGER,
  },

  partId: {
    type: DataTypes.INTEGER,
  },

  phoneName: {
    type: DataTypes.STRING
  },

  partName: {
    type: DataTypes.STRING
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

  description: {
    type: DataTypes.STRING
  },

  picture: {
    type: DataTypes.TEXT
  },

  adminMessage: {
    type: DataTypes.TEXT
  },

  authority: {
    type: DataTypes.TEXT
  }
});

User.hasMany(Order, { as: "user" })
Order.belongsTo(User, {
  foreginKey: "userId",
  as: "user"
})

User.hasMany(Order, { as: "repairman" })
Order.belongsTo(User, {
  foreginKey: "repairmanId",
  as: "repairman"
})

Order.hasMany(Transactions, { foreginKey: "orderId" });
Transactions.belongsTo(Order, {})

module.exports = Order;
