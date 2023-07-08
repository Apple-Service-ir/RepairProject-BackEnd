const User = require("../../models/User")

const get = async (req, res) => {
    let users = await User.findAll({ order: [['id', 'DESC']] })

    users.pop()

    users = users.filter(user => user.id != req.user.id)

    res.json({ ok: true, users })
}

module.exports = {
    get
}