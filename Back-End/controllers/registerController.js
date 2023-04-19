const User = require("../models/User");

const post = async (req, res) => {
  const [firstName, lastName, city, phone, password] = req.body; // Data come from request

  const isPhoneUsed = await User.findOne({ where: { phone } });
  if (isPhoneUsed) return res.send({ ok: false, err: "phone number used" });

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
      res.send({ ok: true }); // Successfully created
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ ok: false, err: "can't create user" }); // Can't create
    });
};

module.exports = {
  post,
};
