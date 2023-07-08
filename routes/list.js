let { Router } = require("express")
Router = new Router()

const devicesController = require("../controllers/list/devicesController")
Router.get("/devices", devicesController.get)

const productsController = require("../controllers/list/partsController")
Router.get("/parts", productsController.get)

const citiesController = require("../controllers/list/citiesController")
Router.get("/cities", citiesController.get)

module.exports = Router