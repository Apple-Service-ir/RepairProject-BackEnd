const express = require("express");
const { isAdmin, isLoggedIn } = require("../helpers/auth");
const Router = express.Router();

const registerController = require("../models/User");
Router.post("/register", registerController.post);

module.exports = Router;
