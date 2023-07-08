const zarinpal = require("../../helpers/zarinpal")

const get = async (req, res) => {
    zarinpal.UnverifiedTransactions().then(res => {
        if (res.status === 100) return res.json({ ok: true, authorities: res.authorities })
    }).catch(err => {
        res.status(401).json({ ok: false, err: err })
    })
}

module.exports = {
    get
}