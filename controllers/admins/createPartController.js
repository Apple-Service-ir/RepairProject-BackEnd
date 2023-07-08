const Part = require("../../models/Part")

const post = async (req, res) => {
    if (!req.body.name) return res.status(401).json({ ok: false, err: "parameters not defined [name]" })

    const newPart = await Part.create({
        name: req.body.name
    })

    res.json({ ok: true, part: { id: newPart.id, name: newPart.name } })
}

module.exports = {
    post
}