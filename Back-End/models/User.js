const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../configs/db");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
  },

  firstName: {
    type: DataTypes.STRING,
  },

  lastName: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
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

  password: {
    type: DataTypes.STRING,
  },
});

//? A function for check if password is correct. It will return true and false. You can't access to decrypted password
User.validPassword = (password, correctPassword) => {
  return bcrypt.compareSync(correctPassword, password);
};

//? A function for encrypt password. It will return encrypted password.
User.encryptPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10); // Generate a salt for encryption
  const hash = await bcrypt.hashSync(password, salt); // Create hash (encrypt password) using generated salt
  return hash;
};

module.exports = User;
