let { Router } = require("express")
const { isUserLoggedIn } = require("../helpers/jwtAuth")

Router = new Router()

const submitController = require("../controllers/orders/submitController")
Router.post("/submit", isUserLoggedIn, submitController.post)

const logController = require("../controllers/orders/logController")
Router.get("/log", isUserLoggedIn, logController.get)

const cancelController = require("../controllers/orders/cancelController")
Router.post("/cancel", isUserLoggedIn, cancelController.post)

module.exports = Router