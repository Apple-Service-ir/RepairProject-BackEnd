const Phone = require("../../models/Phone")

const post = async (req, res) => {
    if (!req.body.id) return res.status(401).json({ ok: false, err: "parameters not found [id]" })

    const findDevice = await Phone.findByPk(req.body.id)
    if (!findDevice) return res.status(401).json({ ok: false, err: "device id is not defined" })

    await findDevice.destroy()
    res.json({ ok: true })
}

module.exports = {
    post
}