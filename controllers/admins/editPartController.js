const Part = require("../../models/Part")

const post = async (req, res) => {
    if (!req.body.id || !req.body.data) return res.status(401).json({ ok: false, err: "parameters not defined [id, data]" })

    const findPart = await Part.findByPk(req.body.id)
    if (!findPart) return res.status(401).json({ ok: false, err: "part id is not defined" })

    await findPart.update(req.body.data)
    res.json({ ok: true })
}

module.exports = {
    post
}