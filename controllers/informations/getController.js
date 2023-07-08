const get = (req, res) => {
    return res.send({ ok: true, user: req.user, token: req.user.token });
}

module.exports = {
    get
}