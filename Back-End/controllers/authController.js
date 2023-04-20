const User = require("../models/User");
const Code = require("../models/Code");
const authCode = require("../helpers/authCode");

const post = async (req, res) => {
  // Get user by phone number
  const isUserValid = await User.findOne({
    where: { phone: req.body.phone },
  });
  // Check if user is valid
  if (isUserValid) {
    // Request for generate new code
    if (req.query.action == "generate") {
      const code = authCode.generate(1000, 9999); // Generate random number between 1000 to 9999
      // Insert code into database (with userId)
      await Code.create({ code, userId: isUserValid.id }).then(() => {
        res.json({ ok: true });
      });
      // Request for submit auth code
    } else if (req.query.action == "submit") {
      // Get all codes
      await Code.findAll({
        where: { userId: isUserValid.id },
      }).then((result) => {
        let counter = 1;
        // Check all codes with submited code
        result.forEach((singleCode) => {
          counter++;
          // If code match, create new loop for destroy all codes
          if (singleCode.code == req.body.code) {
            result.forEach(async (r) => {
              await r.destroy();
            });
            return res.send({ ok: true });
            // About async, check next result if it's last result, send err
          } else if (!result[counter]) {
            return res.send({ ok: false, err: "code dosen't match" });
          }
        });
      });
    }
  } else {
    res.json({ ok: false, err: "user is not valid" });
  }
};

module.exports = {
  post,
};
