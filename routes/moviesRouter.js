var express = require("express");
var router = express.Router();
let moviesController = require("../controllers/moviesControllers")


router.get("/list", moviesController.list)

module.exports = router

