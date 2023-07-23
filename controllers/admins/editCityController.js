const City = require("../../models/City")

const post = async (req, res) => {
    if (!req.body.id || !req.body.data) return res.status(401).json({ ok: false, err: "parameters undefined [id, data]" })

    const findCity = await City.findByPk(req.body.id)

    if (!findCity) return res.status(401).json({ ok: false, err: "invalid city id" })

    await findCity.update(req.body.data)

    res.json({ ok: true })
}

module.exports = {
    post
}