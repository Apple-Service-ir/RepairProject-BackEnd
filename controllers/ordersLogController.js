const Order = require("../models/Order");

const post = async (req, res) => {
  if (req.user) {
    const findOrders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(findOrders);
  } else {
    return res.json({ ok: false, err: "user is not defined" });
  }
};

module.exports = {
  post,
};
