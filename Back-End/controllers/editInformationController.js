const User = require("../models/User");

const post = async (req, res) => {
  const findUser = await User.findOne({ where: { userId: req.body.userId } });

  const [firstName, lastName, city, phone, profile, password] = req.body;

  if (findUser) {
    await findUser
      .update({
        firstName,
        lastName,
        city,
        phone,
        profile,
        password,
        profile: req.file.filename || findUser.profile,
      })
      .then(() => {
        return res.send({ ok: true });
      });
  } else {
    return res.send({ ok: false, err: "user not found" });
  }
};

module.exports = {
  post,
};
