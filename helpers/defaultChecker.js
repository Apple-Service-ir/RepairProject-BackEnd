const config = require("../configs/config.json")
const bcrypt = require("../helpers/bcrypt")

let allModels = require("../models/allModels")

const defaultChecker = async () => {
  // Check for default admin user
  allModels = allModels()

  console.log("Syncing")

  await allModels.User.sync()
  await allModels.Code.sync()
  await allModels.City.sync()
  await allModels.Content.sync()
  await allModels.JWTDeny.sync()
  await allModels.Part.sync()
  await allModels.Phone.sync()
  await allModels.Ticket.sync()
  await allModels.Order.sync()
  await allModels.TicketMessage.sync()
  await allModels.Transaction.sync()

  console.log("Checking default user");

  const result = await allModels.User.findAll();
  if (!result || !result[0]) {
    // No admin (Maybe first time running)
    console.log(
      `--------------------\nDefault user created\n\tUsername : ${config.defaultUsername}\n\tPassword : ${config.defaultPassword}\n--------------------`
    );

    await allModels.User.create({
      username: config.defaultUsername,
      password: await bcrypt.encrypt(config.defaultPassword),
      role: config.defaultRank,
    });

    await allModels.City.bulkCreate([
      { name: "نیشابور" },
      { name: "مشهد" },
      { name: "تهران" },
      { name: "شیراز" },
      { name: "اصفهان" }
    ])

    await allModels.Phone.bulkCreate([
      { brand: "iPhone", model: "14 ProMax" },
      { brand: "iPhone", model: "14 Pro" },
      { brand: "iPhone", model: "14 Plus" },
      { brand: "iPhone", model: "14" },
      { brand: "iPhone", model: "13 ProMax" },
      { brand: "iPhone", model: "13 Pro" },
      { brand: "iPhone", model: "13" },
      { brand: "iPhone", model: "13 Mini" },
      { brand: "iPhone", model: "SE 3gen" },
      { brand: "iPhone", model: "12 ProMax" },
      { brand: "iPhone", model: "12 Pro" },
      { brand: "iPhone", model: "12" },
      { brand: "iPhone", model: "12 Mini" },
      { brand: "iPhone", model: "11 ProMax" },
      { brand: "iPhone", model: "11 Pro" },
      { brand: "iPhone", model: "11" },
      { brand: "iPhone", model: "SE 2gen" },
      { brand: "iPhone", model: "Xs Max" },
      { brand: "iPhone", model: "Xs" },
      { brand: "iPhone", model: "X" },
      { brand: "iPhone", model: "8 Plus" },
      { brand: "iPhone", model: "8" },
      { brand: "iPhone", model: "7 Plus" },
      { brand: "iPhone", model: "7" },
      { brand: "iPhone", model: "6s Plus" },
      { brand: "iPhone", model: "6s" },
      { brand: "iPhone", model: "SE 1gen" },
      { brand: "iPhone", model: "6 Plus" },
      { brand: "iPhone", model: "6" },
      { brand: "iPhone", model: "5s" },
      { brand: "iPhone", model: "5" },
      { brand: "iPhone", model: "5c" },
    ])

    await allModels.Part.bulkCreate([
      { name: "LCD - نمایشگر" },
      { name: "Battery - باتری" },
      { name: "Frame - فریم" },
      { name: "FaceID - فیس ایدی" },
      { name: "Front Camera - دوربین جلو" },
      { name: "Rear Camera - دوربین پشت" },
    ])
  }

};

module.exports = defaultChecker;
