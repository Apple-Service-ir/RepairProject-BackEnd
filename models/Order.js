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
  }
});

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  firstName: {
    type: DataTypes.STRING,
  },

  lastName: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  },

  city: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },

  profile: {
    type: DataTypes.STRING,
  },

  session: {
    type: DataTypes.TEXT
  }
})

const Transactions = db.define("transactions", {
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

Order.sync()

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
