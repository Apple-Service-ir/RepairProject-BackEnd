const Order = require("../../models/Order");

const get = async (req, res) => {
  res.json({ ok: true, orders: await Order.findAll({ where: { userId: req.user.id }, order: [['id', 'DESC']], include: ['repairman', 'user', 'transactions'] }) })
};

module.exports = {
  get,
};
