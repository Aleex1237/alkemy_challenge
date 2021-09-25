var express = require("express");
var router = express.Router();
const authController=require("../controllers/authController")


/* GET users listing. */
router.get("/login", authController.login);


router.get("/register",authController.register);

module.exports = router;
