const City = require("../../models/City")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters undefined [id]" })

    const findCity = await City.findByPk(req.body.id)

    if (!findCity) return res.status(401).json({ ok: false, err: "invalid city id" })

    await findCity.destroy()

    res.json({ ok: true })
}

module.exports = {
    post
}