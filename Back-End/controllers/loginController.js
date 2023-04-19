const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../configs/config.json");

const post = async (req, res) => {
  if (req.params.action == "password") {
    const user = await User.findOne({ where: { phone: req.body.phone } }); // Found user information by phone number

    // User is not valid
    if (!user)
      return res.status(403).json({ ok: false, err: "user not found" });

    // Validate password using user password in database
    const isPasswordCorrect = await User.validPassword(
      user.password,
      req.body.password
    );

    // Password is not valid
    if (!isPasswordCorrect)
      return res
        .status(403)
        .json({ ok: false, err: "password is not correct" });

    delete user.password; // Delete password (password have not send with response)

    const token = jwt.sign(user, config.app.secret, { expiresIn: "1h" }); // Create token

    return res.json(token);
  }
};

module.exports = {
  post,
};
