const express = require("express");
const { isUserLoggedIn, isUserNotLoggedIn } = require("../helpers/jwtAuth");
const Router = express.Router();

const registerController = require("../controllers/registerController");
Router.post("/register", registerController.post);

const loginController = require("../controllers/loginController");
Router.post("/login", loginController.post);

const smsGenerateController = require("../controllers/smsGenerateController");
Router.post("/sms/generate", smsGenerateController.post);

const smsAuthController = require("../controllers/smsAuthController");
Router.post("/sms/auth", smsAuthController.post);

module.exports = Router;
