let { Router } = require("express")
const { isUserLoggedIn } = require("../helpers/jwtAuth")

Router = new Router()

const payController = require("../controllers/payments/payController")
Router.post("/pay", isUserLoggedIn, payController.post)

const verifyController = require("../controllers/payments/verifyController")
Router.post("/verify", verifyController.post)

const unverifiedTransactions = require("../controllers/payments/unverifiedController")
Router.get("/unverified", isUserLoggedIn, unverifiedTransactions.get)

module.exports = Router