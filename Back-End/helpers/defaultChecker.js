const config = require("../configs/config.json");
const fs = require("fs");

const defaultChecker = async () => {
  console.log("Reading Models directory.");
  // Read models and create table for each model which is not exist
  fs.readdirSync("./models").forEach((model) => {
    console.log(`Registering model ${model.split(".")[0]}`);
    const requiredModel = require(`../models/${model}`);
    requiredModel.sync(); // Check and create table if it's not exist
  });

  // Check for default admin user
  console.log("Checking default user");
  const requireUser = require("../models/User");
  await requireUser.findAll().then(async (result) => {
    if (!result || !result[0]) {
      // No admin
      console.log(
        `--------------------\nDefault user created\n\tUsername : ${config.defaultUser.username}\n\tPassword : ${config.defaultUser.password}\n--------------------`
      );
      await requireUser.create({
        username: config.defaultUser.username,
        password: await requireUser.encryptPassword(
          config.defaultUser.password
        ),
        userRank: config.defaultUser.userRank,
      }); // Insert default user using config file
    }
  });
};

module.exports = defaultChecker;
