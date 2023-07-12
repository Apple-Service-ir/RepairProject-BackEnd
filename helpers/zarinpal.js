const ZarinpalCheckout = require("zarinpal-checkout")
const config = require("../configs/config.json")

const zarinpal = ZarinpalCheckout.create(config.merchentId, true)

module.exports = zarinpal