const Code = require("../models/Code")

const generate = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const isCodeNotExpired = async (codeRecord) => {
  if (!codeRecord.code || !codeRecord.createdAt) return null

  const createdDate = new Date(codeRecord.createdAt)
  const now = new Date()

  if (createdDate.setMinutes(createdDate.getMinutes() + 2) > now) return true

  await codeRecord.destroy()
  return false
}

const validate = async (code, userInfo) => {
  const isUserHaveCode = await Code.findAll({ where: userInfo })

  if (isUserHaveCode.length < 1) return { ok: false, err: "شما کد فعال ندارید." }

  for (let i = 0; i < isUserHaveCode.length; i++) {
    const singleCode = isUserHaveCode[i]

    if (isCodeNotExpired(singleCode) && code == singleCode.code) {
      isUserHaveCode.forEach(async (r) => { await r.destroy(); });
      return { ok: true }
    }

  };

  return { ok: false, err: "کد وارد شده صحیح نمی‌باشد." }
}

module.exports = {
  generate,
  validate,
  isCodeNotExpired
};
