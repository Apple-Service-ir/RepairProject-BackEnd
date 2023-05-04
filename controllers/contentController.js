const Content = require("../models/Content");

const post = async (req, res) => {
  const [name] = req.body;
  if (name) {
    let content;
    switch (name) {
      case "home":
        content = await Content.findAll().filter((c) =>
          c.name.includes("home-")
        );
        break;

      default:
        content = await Content.findOne({ where: { name } });
        break;
    }

    if (content) {
      return res.send(isContentAvailable);
    } else res.json({ ok: false, err: "content not defined" });
  } else res.json({ ok: false, err: "parameters not defined [name]" });
};

module.exports = {
  post,
};
