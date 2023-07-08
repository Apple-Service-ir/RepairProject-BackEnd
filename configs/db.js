const sequelize = require("sequelize");
const config = require("./config.json")

const db = new sequelize(
  config.databaseName,
  config.databaseUser,
  config.databasePassword,
  {
    host: config.databaseHost,
    dialect: "mysql",
  }
);

try {
  db.authenticate();
  console.log("[RUN] Database is running");
} catch (e) { console.log("[RUN] DataBase connection error", e); }

module.exports = db;
