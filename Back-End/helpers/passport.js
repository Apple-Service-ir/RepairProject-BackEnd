const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.initialize();

passport.use(
  new localStrategy(async function (username, password, done) {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    try {
      if (!user) return done(null, false, { message: "" });
    } catch (error) {
      done(error);
    }
  })
);
