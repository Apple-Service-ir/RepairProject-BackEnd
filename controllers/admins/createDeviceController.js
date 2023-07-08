const Device = require("../../models/Phone")

const post = async (req, res) => {
    if (!req.body.brand || !req.body.model) return res.status(401).json({ ok: false, err: "parameters not defined [brand, model]" })

    const newDevice = await Device.create({
        brand: req.body.brand,
        model: req.body.model
    })

    res.json({ ok: true, device: { id: newDevice.id, brand: newDevice.brand, model: newDevice.model } })
}

module.exports = {
    post
}