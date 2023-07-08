const Part = require("../../models/Part")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters not defined [id]" })

    const findPart = await Part.findByPk(req.body.id)
    if (!findPart) return res.status(401).json({ ok: false, err: "part id is not defined" })

    await findPart.destroy()
    res.json({ ok: true })
}

module.exports = {
    post
}