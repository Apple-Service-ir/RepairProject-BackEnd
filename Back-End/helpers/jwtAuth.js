const jwt = require("jsonwebtoken");
const config = require("../configs/config.json");

const isUserLoggedIn = (req, res, next) => {
  try {
    // Trying for decode token if it's exist
    const user = jwt.verify(token, config.app.secret);
    req.user = user; // Set user informations (anything is in User model) into request
    next(); // Going
  } catch (error) {
    res.send({ isUserLoggedIn: false }); // User is not logged in
  }
};

const isUserNotLoggedIn = (req, res, next) => {
  try {
    // Trying for decode token if it's exist
    // ! Becuase it's "notLoggedIn", if decode token is success proccess will broke and send false
    jwt.verify(token, config.app.secret);
    res.send({ isUserNotLoggedIn: false });
  } catch (error) {
    next();
  }
};

module.exports = {
  isUserLoggedIn,
  isUserNotLoggedIn,
};
