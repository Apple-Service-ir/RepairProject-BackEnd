const User = require("../models/User");

const post = async (req, res) => {
  const [firstName, lastName, city, phone, password] = req.body;

  await User.create({
    firstName,
    lastName,
    role: "user",
    city,
    phone,
    profile: req.file.filename,
    password: await User.encryptPassword(password),
  })
    .then(() => {
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });
};

module.exports = {
  post,
};
