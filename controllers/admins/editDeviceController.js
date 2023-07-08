const Device = require("../../models/Phone")

const post = async (req, res) => {
    if (!req.body.id || !req.body.data) return res.status(401).json({ ok: false, err: "parameters not defined [id, data]" })

    const findDevice = await Device.findByPk(req.body.id)
    if (!findDevice) return res.status(401).json({ ok: false, err: "device id is not defined" })

    await findDevice.update(req.body.data)
    res.json({ ok: true })
}

module.exports = {
    post
}