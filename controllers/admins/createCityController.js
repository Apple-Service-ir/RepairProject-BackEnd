const City = require("../../models/City")

const post = async (req, res) => {
    if (!req.body.name) return res.status(401).json({ ok: false, err: "parameters undefined [name]" })

    const city = await City.create({
        name: req.body.name
    })

    res.json({ ok: true, city })
}

module.exports = {
    post
}