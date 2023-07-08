let { Router } = require("express")
const { isUserRepairman, isUserLoggedIn } = require("../helpers/jwtAuth")

Router = new Router()

const getOrdersController = require("../controllers/repairmans/getOrdersController")
Router.get("/orders/get", isUserLoggedIn, isUserRepairman, getOrdersController.get)

const acceptOrdersController = require("../controllers/repairmans/acceptOrderController")
Router.post("/orders/accept", isUserLoggedIn, isUserRepairman, acceptOrdersController.post)

const cancelOrdersController = require("../controllers/repairmans/cancelOrderController")
Router.post("/orders/cancel", isUserLoggedIn, isUserRepairman, cancelOrdersController.post)

const doneOrderController = require("../controllers/repairmans/doneOrderController")
Router.post("/orders/done", isUserLoggedIn, isUserRepairman, doneOrderController.post)

const setPriceControlller = require("../controllers/repairmans/setPriceController")
Router.post("/orders/price/set", isUserLoggedIn, isUserRepairman, setPriceControlller.post)

module.exports = Router