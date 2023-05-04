const config = require("../configs/config.json");
const User = require("../models/User");
const fs = require("fs");

const defaultChecker = async () => {
  console.log("Reading Models directory.");
  // Read models and create table for each model which is not exist
  fs.readdirSync("./models").forEach((model) => {
    console.log(`Registering model ${model.split(".")[0]}`);
    require(`../models/${model}`).sync();
  });

  // Check for default admin user
  console.log("Checking default user");
  const result = await User.findAll();
  if (!result || !result[0]) {
    // No admin
    console.log(
      `--------------------\nDefault user created\n\tUsername : ${config.defaultUser.username}\n\tPassword : ${config.defaultUser.password}\n--------------------`
    );
    await User.create({
      username: config.defaultUser.username,
      password: await User.encryptPassword(config.defaultUser.password),
      userRank: config.defaultUser.userRank,
    }); // Insert default user using config file
  }
};

module.exports = defaultChecker;
