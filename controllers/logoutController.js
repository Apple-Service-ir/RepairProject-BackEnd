const burnToken = require("../helpers/burnToken")

const post = async (req, res) => {
    const isTokenBurned = burnToken(req.user.token, req.user)

    if (!isTokenBurned) return res.status(401).json({ ok: false, err: `توکن شما از بین رفته است.` })

    res.json({ ok: true })
}

module.exports = {
    post
}