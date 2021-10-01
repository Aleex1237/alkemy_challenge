var express = require("express");
var router = express.Router();

//Middlewares & validations
const userUpdateValidator = require("../validations/userUpdateValidator");

//Controllers
const usersController = require("../controllers/usersController");

router.get("/", usersController.list);
router.get("/:id", usersController.detail);

router.put("/:id", userUpdateValidator, usersController.update);

router.delete("/:id", usersController.delete);

module.exports = router;
