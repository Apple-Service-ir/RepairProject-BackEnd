const User = require("../models/User");
const sms = require("../helpers/sms")
const { generateToken } = require("../helpers/jwtAuth")
const Code = require("../models/Code");
const authCode = require("../helpers/authCode");

const post = async (req, res) => {

  const isUserValid = await User.findOne({ where: { phone: req.body.phone }, }); // Get user by phone number

  if (req.query.action == "generate") { // Request for generate new code

    if (!isUserValid && req.query.mode == "login") return res.status(404).json({ ok: false, err: `حساب کاربری با این شماره یافت نشد. لطفا ثبت نام کنید.`, nextPage: false });

    if (isUserValid && req.query.mode == "register") return res.status(401).json({ ok: false, err: "این شماره از قبل ثبت شده است.", nextPage: false })

    const isUserHaveCode = await Code.findAll({ where: { phone: req.body.phone } })

    if (isUserHaveCode.length < 1) {
      sms.authCode(req.body.phone)
      return res.json({ ok: true, nextPage: true });
    }

    isUserHaveCode.forEach(async (code, index) => {

      if (await authCode.isCodeNotExpired(code)) return res.status(406).send({ ok: false, err: "شما کد فعال دارید، لطفا آن را وارد کنید", nextPage: true })

      if (!isUserHaveCode[index + 1]) {
        sms.authCode(req.body.phone)
        return res.json({ ok: true, nextPage: true });
      }

    })

  } else if (req.query.action == "submit") { // Request for submit auth code

    if (!req.body.phone || !req.body.code) return res.status(400).send({ ok: false, err: "complete parameters [phone, code]" })

    const isCodeCorrect = await authCode.validate(req.body.code, { phone: req.body.phone })
    if (!isCodeCorrect.ok) return res.status(401).json(isCodeCorrect)

    let token = null

    if (req.query.mode == "login") token = generateToken({ id: isUserValid.id, session: isUserValid.session })

    return res.json({ ok: true, token, user: isUserValid })
  }

};

module.exports = {
  post,
};
