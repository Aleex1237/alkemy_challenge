var express = require("express");
var router = express.Router();

//Middlewares & validations
const authValidatorRegister = require("../validations/authValidatorRegister");

const authValidatorLogin = require("../validations/authValidatorLogin");

//Controllers
const authController = require("../controllers/authController");

router.post("/register", authValidatorRegister, authController.register);

router.post("/login", authValidatorLogin, authController.login);

module.exports = router;
