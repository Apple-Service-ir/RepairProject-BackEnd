const config = require("../configs/config.json");

const isLoggedIn = (req, res, next) => {
  if (!req.user) return res.redirect("/login");
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (req.user) return res.redirect("/");
  next();
};

const isAdmin = (req, res, next) => {
  if (
    req.user.userRank != config.ranks.admin &&
    req.user.userRank != config.ranks.developer
  )
    return res.redirect("/");
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isAdmin,
};
