let { Router } = require("express");
const { isUserNotLoggedIn, isUserLoggedIn } = require("../helpers/jwtAuth");

Router = Router();

const registerController = require("../controllers/registerController");
Router.post("/register", isUserNotLoggedIn, registerController.post);

const authController = require("../controllers/authController")
Router.post("/auth", isUserNotLoggedIn, authController.post)

const logoutController = require("../controllers/logoutController")
Router.post("/logout", isUserLoggedIn, logoutController.post)

module.exports = Router;
