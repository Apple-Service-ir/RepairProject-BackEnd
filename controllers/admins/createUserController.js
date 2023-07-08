const User = require("../../models/User")
const City = require("../../models/City")

const post = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.city) return res.status(400).json({ ok: false, err: "parameters undefined [firstName, lastName, phone, city]" })

    const findCity = await City.findByPk(req.body.city)
    if (!findCity) return res.status(400).json({ ok: false, err: "city is invalid" })

    const isPhoneNumberUsed = await User.findOne({ where: { phone: req.body.phone } })
    if (isPhoneNumberUsed) return res.status(400).json({ ok: false, err: "این شماره موبایل از قبل ثبت شده است." })

    const createdUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        city: findCity.name,
        role: req.body.role || "user"
    })

    res.json({ ok: true, user: createdUser })
}

module.exports = {
    post
}