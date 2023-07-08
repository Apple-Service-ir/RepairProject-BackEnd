const Content = require("../models/Content");

const post = async (req, res) => {
  if (!req.body.page) return res.status(400).json({ ok: false, err: "parameters not defined [page]" });

  let content;

  switch (req.body.page) {
    case "home":

      content = await Content.findAll().filter(c => c.group.startsWith("home__"));
      break;

    default:

      content = await Content.findOne({ where: { page } });
      break;
  }

  res.send(content)
};

module.exports = {
  post,
};
