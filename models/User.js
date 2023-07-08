const { DataTypes } = require("sequelize");
const db = require("../configs/db");

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
});

User.sync()

module.exports = User;
