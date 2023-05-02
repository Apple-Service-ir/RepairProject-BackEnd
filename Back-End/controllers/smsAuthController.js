const Code = require("../models/Code");

const post = async (req, res) => {
  if (req.body.phone) {
    if (req.body.code) {
      const isUserHaveCode = await Code.findAll({
        where: { phone: req.body.phone },
      });

      if (isUserHaveCode && isUserHaveCode[0]) {
        // TODO : check if code is not expired
        const targetCode = isUserHaveCode.find(
          (code) => code.code == req.body.code
        );
        await targetCode.destroy().then(() => {
          // TODO : generate a token and send it as result
          res.send({ ok: true });
        });
      }
    } else {
      return res.send({ ok: false, err: "code is not defined" });
    }
  } else {
    return res.send({ ok: false, err: "phone number is not defined" });
  }
};

module.exports = {
  post,
};
