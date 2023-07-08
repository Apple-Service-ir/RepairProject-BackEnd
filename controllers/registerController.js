const User = require("../models/User");
const config = require("../configs/config.json")
const authCode = require("../helpers/authCode")
const City = require("../models/City")
const jwt = require("jsonwebtoken")

const post = async (req, res) => {
  const isPhoneUsed = await User.findOne({ where: { phone: req.body.phone } });
  if (isPhoneUsed) return res.status(401).send({ ok: false, err: "این شماره موبایل از قبل ثبت شده است." });

  const city = await City.findByPk(req.body.city)
  if (!city) return res.status(400).json({ ok: false, err: "city id is not valid" })

  try { //Try for create new user
    const createdUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: "user",
      city: city.name,
      phone: req.body.phone,
      session: authCode.generate(100, 9999)
    });

    const token = jwt.sign({ id: createdUser.id, session: createdUser.session }, config.secret, { expiresIn: "30d" });

    res.send({ ok: true, token, user: createdUser.dataValues });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, err: "خطای سرور. عملیات با شکست مواجه شد." }); // Can't create [Internal error]
  }
};

module.exports = {
  post,
};
