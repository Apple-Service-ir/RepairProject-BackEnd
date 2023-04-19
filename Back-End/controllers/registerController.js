const User = require("../models/User");

const post = async (req, res) => {
  const [firstName, lastName, city, phone, password] = req.body; // Data come from request

  // Create new user
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
      res.send(true); // Successfully created
    })
    .catch((error) => {
      console.log(error);
      res.send(false); // Can't create
    });
};

module.exports = {
  post,
};
