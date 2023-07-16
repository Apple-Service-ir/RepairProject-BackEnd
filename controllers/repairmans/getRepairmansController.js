const User = require("../../models/User")

const get = async (req, res) => {
    const repairmans = await User.findAll({
        where: {
            role: 'repairman',
        }
    })

    res.json({ ok: true, repairmans })
}

module.exports = {
    get
}