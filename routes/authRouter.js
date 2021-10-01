var express = require("express");
var router = express.Router();

//Middlewares & validations
const authValidator = require("../validations/authValidator");

//Controllers
const authController = require("../controllers/authController");

router.post("/register", authValidator, authController.register);

module.exports = router;
