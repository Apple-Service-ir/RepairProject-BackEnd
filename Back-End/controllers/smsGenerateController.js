const authCode = require("../helpers/authCode");
const Code = require("../models/Code");

const post = async (req, res) => {
  if (req.body.phone) {
    const isUserHaveCode = await Code.findOne({
      where: { phone: req.body.phone },
    });

    if (isUserHaveCode) {
      // TODO : check and send code to user if user requested for code after 60 seconds
    } else {
      const generatedCode = authCode.generate(1111, 9999);
      await Code.create({ code: generatedCode, phone: req.body.phone }).then(
        () => {
          // TODO : Send code to user's phone number
          return res.send({ ok: true });
        }
      );
    }
  } else {
    return res.send({ ok: false, err: "phone number is not defined" });
  }
};

module.exports = {
  post,
};
