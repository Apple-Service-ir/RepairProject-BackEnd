const express = require("express");
const { isAdmin, isLoggedIn } = require("../helpers/auth");
const Router = express.Router();

const singleBlogController = require("../controllers/singleBlogController");
Router.get("/blogs/:id", singleBlogController.get);
Router.post("/blogs/:id", isLoggedIn, isAdmin, singleBlogController.post);

const blogsController = require("../controllers/blogsController");
Router.get("/blogs", blogsController.get);

module.exports = Router;
