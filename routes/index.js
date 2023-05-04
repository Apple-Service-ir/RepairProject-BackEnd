const express = require("express");
const { isUserLoggedIn, isUserNotLoggedIn } = require("../helpers/jwtAuth");
const Router = express.Router();

const registerController = require("../controllers/registerController");
Router.post("/register", isUserNotLoggedIn, registerController.post);

const loginController = require("../controllers/loginController");
Router.post("/login", isUserNotLoggedIn, loginController.post);

const smsGenerateController = require("../controllers/smsGenerateController");
Router.post("/sms/generate", smsGenerateController.post);

const smsAuthController = require("../controllers/smsAuthController");
Router.post("/sms/auth", smsAuthController.post);

<<<<<<< HEAD:routes/index.js
const contentController = require("../controllers/contentController");
Router.post("/content", contentController.post);
=======
const editInformationController = require("../controllers/editInformationController");
Router.post("/informations/edit", editInformationController.post);

const ordersLogController = require("../controllers/ordersLogController");
Router.post("/orders/log", isUserLoggedIn, ordersLogController.post);
>>>>>>> master:Back-End/routes/index.js

module.exports = Router;
