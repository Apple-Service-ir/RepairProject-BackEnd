const City = require("../../models/City")
const Order = require("../../models/Order.js")
const Phone = require("../../models/Phone.js")
const Part = require("../../models/Part.js")

const post = async (req, res) => {
  const city = await City.findByPk(req.body.city)
  const isPhoneAvailable = await Phone.findByPk(req.body.phoneId)
  const isProductAvailable = await Part.findByPk(req.body.partId)

  if (!city) return res.status(400).json({ ok: false, err: "شهر انتخاب شده مجاز نمی‌باشد." })
  if (!isPhoneAvailable) return res.status(400).json({ ok: false, err: "دستگاه انتخاب شده مجاز نمی‌باشد." })
  if (!isProductAvailable) return res.status(400).json({ ok: false, err: "قطعه انتخاب شده مجاز نمی‌باشد." })

  if (!req.files || !req.files.picture.name) return res.status(400).json({ ok: false, err: "لطفا عکس دستگاه خود را انتخاب کنید." })

  const isUserHavePendingOrder = await Order.findOne({ where: { userId: req.user.id, status: "pending" } })
  const isUserHaveWorkingOrder = await Order.findOne({ where: { userId: req.user.id, status: "working" } })

  if (isUserHavePendingOrder || isUserHaveWorkingOrder) return res.status(406).json({ ok: false, err: "شما سفارش فعال دارید." })

  const file = req.files.picture;
  const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1e9)
  const fileFormat = file.name.split(".")[file.name.split(".").length - 1]
  const uniqueFileName = `${file.name.replace(fileFormat, "")}-${req.user.id}-${uniqueString}.${fileFormat}`


  file.mv(`./public/uploads/${uniqueFileName}`, async (err) => {
    if (err) return res.status(500).send({ ok: false, err });

    if (!req.body.description.endsWith(".")) req.body.description = req.body.description.trim() + "."
    if (!req.body.address.endsWith(".")) req.body.address = req.body.address.trim() + "."

    await Order.create({
      userId: req.user.id,
      address: `${city.name}، ${req.body.address}`,
      phoneId: isPhoneAvailable.id,
      partId: isProductAvailable.id,
      phoneName: isPhoneAvailable.brand + " " + isPhoneAvailable.model,
      partName: isProductAvailable.name,
      city: city.name,
      status: "pending",
      description: req.body.description,
      picture: uniqueFileName
    })

    res.json({ ok: true })
  });

}

module.exports = {
  post
}
