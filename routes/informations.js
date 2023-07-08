let { Router } = require("express")
const { isUserLoggedIn } = require("../helpers/jwtAuth")

Router = new Router()

const getController = require("../controllers/informations/getController")
Router.get("/get", isUserLoggedIn, getController.get)

const editController = require("../controllers/informations/editController")
Router.post("/edit", isUserLoggedIn, editController.post)

module.exports = Router