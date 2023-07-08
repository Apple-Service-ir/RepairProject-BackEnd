let { Router } = require("express")
const { isUserLoggedIn } = require("../helpers/jwtAuth")

Router = new Router()

const getAllController = require("../controllers/tickets/getAllController")
Router.get("/all", isUserLoggedIn, getAllController.get)

const newController = require("../controllers/tickets/newController")
Router.post("/new", isUserLoggedIn, newController.post)

const closeController = require("../controllers/tickets/closeController")
Router.post("/close", isUserLoggedIn, closeController.post)

const newMessageController = require("../controllers/tickets/newMessageController")
Router.post("/messages/new", isUserLoggedIn, newMessageController.post)

module.exports = Router