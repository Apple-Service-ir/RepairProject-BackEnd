const JWTDeny = require("../models/JWTDeny")
const User = require("../models/User")
const bcrypt = require("../helpers/bcrypt")
const authCode = require("../helpers/authCode")

const burnToken = async (token, user) => {
    const isTokenBurned = await JWTDeny.findOne({ where: { token } })

    if (isTokenBurned) return false

    await JWTDeny.create({ token })

    const findUser = await User.findByPk(user.id)
    await findUser.update({ session: await bcrypt.encrypt(authCode.generate(100, 9999)) })

    return true
}

module.exports = burnToken