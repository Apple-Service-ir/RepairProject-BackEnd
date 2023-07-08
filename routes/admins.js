let { Router } = require("express")
const { isUserLoggedIn, isUserAdmin, isUserSupporter } = require("../helpers/jwtAuth")

Router = new Router()

const getAllUsersController = require("../controllers/admins/getAllUsersController")
Router.get("/users/all", isUserLoggedIn, isUserSupporter, getAllUsersController.get)

const getAllOrdersController = require("../controllers/admins/getAllOrdersController")
Router.get("/orders/all", isUserLoggedIn, isUserSupporter, getAllOrdersController.get)

const changeStatusController = require("../controllers/admins/changeOrderStatusController")
Router.post("/orders/status", isUserLoggedIn, isUserSupporter, changeStatusController.post)

const createUserController = require("../controllers/admins/createUserController")
Router.post("/users/create", isUserLoggedIn, isUserSupporter, createUserController.post)

const deleteUserController = require("../controllers/admins/deleteUserController")
Router.post("/users/delete", isUserLoggedIn, isUserAdmin, deleteUserController.post)

const createDeviceController = require("../controllers/admins/createDeviceController")
Router.post("/devices/create", isUserLoggedIn, isUserAdmin, createDeviceController.post)

const createPartController = require("../controllers/admins/createPartController")
Router.post("/parts/create", isUserLoggedIn, isUserAdmin, createPartController.post)

const deletePartController = require("../controllers/admins/deletePartController")
Router.post("/parts/delete", isUserLoggedIn, isUserAdmin, deletePartController.post)

const deleteDeviceController = require("../controllers/admins/deleteDeviceController")
Router.post("/devices/delete", isUserLoggedIn, isUserAdmin, deleteDeviceController.post)

const editPartController = require("../controllers/admins/editPartController")
Router.post("/parts/edit", isUserLoggedIn, isUserAdmin, editPartController.post)

const editDeviceController = require("../controllers/admins/editDeviceController")
Router.post("/devices/edit", isUserLoggedIn, isUserAdmin, editDeviceController.post)

const createCityController = require("../controllers/admins/createCityController")
Router.post("/cities/create", isUserLoggedIn, isUserAdmin, createCityController.post)

const editCityController = require("../controllers/admins/editCityController")
Router.post("/cities/edit", isUserLoggedIn, isUserAdmin, editCityController.post)

const deleteCityController = require("../controllers/admins/deleteCityController")
Router.post("/cities/delete", isUserLoggedIn, isUserAdmin, deleteCityController.post)

module.exports = Router