const User = require("../../models/User");
const fs = require("fs");
const City = require("../../models/City")

const post = async (req, res) => {
  if (!req.body.data) return res.status(401).json({ ok: false, err: "parameters not found [data]" })

  req.body.data = JSON.parse(req.body.data)

  if (req.user.id == req.body.id && req.body.data.phone) return res.status(403).json({ ok: false, err: "شما دسترسی کافی برای انجام این کار را ندارید." })

  const findUser = await User.findByPk(req.body.id || req.user.id);

  if (!findUser) return res.status(401).json({ ok: false, err: "user not found" })

  if (req.body.data.city) {
    let isCityFounded = await City.findByPk(req.body.data.city)
    if (!isCityFounded) isCityFounded = await City.findOne({ where: { name: req.body.data.city } })
    if (!isCityFounded) return res.status(401).json({ ok: false, err: "city not found" })
    req.body.data.city = isCityFounded.name
  }

  const file = req.files?.picture;

  if (file) {
    try {
      findUser.profile && fs.unlinkSync(`/public/uploads/${findUser.profile}`);
    } catch (error) { }

    file.mv(`./public/uploads/${file.name}`, (err) => {
      if (err) return res.status(500).send({ ok: false, err });
    });

    await findUser.update({ profile: file.name })
  }

  await findUser.update(req.body.data)

  res.json({ ok: true, user: findUser });
};

module.exports = {
  post,
};
