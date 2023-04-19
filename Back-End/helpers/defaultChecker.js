const config = require("../configs/config.json");
const fs = require("fs");

const defaultChecker = async () => {
  console.log("Reading Models directory.");
  fs.readdirSync("./models").forEach((model) => {
    console.log(`Registering model ${model.split(".")[0]}`);
    const requiredModel = require(`../models/${model}`);
    requiredModel.sync();
  });

  console.log("Checking default user");
  const requireUser = require("../models/User");
  await requireUser.findAll().then(async (result) => {
    if (!result || !result[0]) {
      console.log(
        `--------------------\nDefault user created\n\tUsername : ${config.defaultUser.username}\n\tPassword : ${config.defaultUser.password}\n--------------------`
      );
      await requireUser.create({
        username: config.defaultUser.username,
        password: await requireUser.encryptPassword(
          config.defaultUser.password
        ),
        userRank: config.defaultUser.userRank,
      });
    }
  });
};

module.exports = defaultChecker;
