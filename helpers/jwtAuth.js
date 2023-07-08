const jwt = require("jsonwebtoken");
const User = require("../models/User")
const blackListToken = require("../models/JWTDeny")
const config = require("../configs/config.json")

const generateToken = (data, expireTime) => {
  if (!expireTime) expireTime = "30d"
  return jwt.sign(data, config.secret, { expiresIn: expireTime });
}

const isUserLoggedIn = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers.authorization?.split(" ")[1]
    // Trying for decode token if it's exist
    const decryptedToken = jwt.verify(token, config.secret);
    const userInformation = await User.findByPk(decryptedToken.id)
    const isTokenBlackList = await blackListToken.findOne({ where: { token: token } })

    if (userInformation && decryptedToken.session == userInformation.session && !isTokenBlackList) {

      req.user = userInformation; // Set user informations (anything is in User model) into request
      req.user.token = token

      next();

    } else res.status(401).json({ ok: false, err: "something went wrong [user not found, session invalid, token is in blacklist]" })

  } catch (error) { res.status(401).json({ ok: false, err: "token is not found" }); }
};

const isUserNotLoggedIn = async (req, res, next) => {
  try {

    const token = req.body.token || req.query.token || req.headers.authorization?.split(" ")[1]
    const user = jwt.verify(token, config.secret);
    await User.findByPk(user.id) && res.status(401).json({ ok: false, err: "user is logged in" });

  } catch (error) {
    next();
  }
};

const isUserAdmin = (req, res, next) => {
  const accessedToAdmin = [
    'admin',
    'developer',
    'owner'
  ]

  req.user.role && (accessedToAdmin.includes(req.user.role))
    ? next()
    : res.status(403).json({ ok: false, err: "شما دسترسی کافی برای انجام این کار را ندارید." });
};

const isUserRepairman = (req, res, next) => {
  const accessedToRepairman = [
    'admin',
    'developer',
    'repairman'
  ]

  req.user.role && accessedToRepairman.includes(req.user.role)
    ? next()
    : res.status(403).json({ ok: false, err: "شما دسترسی کافی برای انجام این کار را ندارید." });
};

const isUserSupporter = (req, res, next) => {
  const accessedToSupporter = [
    'admin',
    'developer',
    'supporter'
  ]

  req.user.role && accessedToSupporter.includes(req.user.role)
    ? next()
    : res.status(403).json({ ok: false, err: "شما دسترسی کافی برای انجام این کار را ندارید." });
}

module.exports = {
  isUserLoggedIn,
  isUserNotLoggedIn,
  isUserAdmin,
  isUserRepairman,
  generateToken,
  isUserSupporter
};
