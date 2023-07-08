const axios = require("axios")
const Code = require("../models/Code")
const auth = require("./authCode")
const config = require("../configs/config.json")

// TODO : Add promise
const send = async (text, to, bodyId) => {
  try {
    await axios.post("https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber", {
      username: config.smsUsername,
      password: config.smsPassword,
      text: text,
      to: to,
      bodyId: bodyId
    })
  } catch (error) { console.log(error) }
}

const authCode = async (phone) => {
  const generatedCode = auth.generate(1000, 9999)

  await send(`${generatedCode};`, phone, config.smsOTP)

  await Code.create({ code: generatedCode, phone: phone });
}

module.exports = { send, authCode }