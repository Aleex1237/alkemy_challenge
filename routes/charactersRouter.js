var express = require("express");
var router = express.Router();

var charactersController = require("../controllers/charactersController");

router.get("/", charactersController.list);

router.get("/character/add", charactersController.addCharacterView);

router.post("/character/add", charactersController.addCharacter);

router.get("/character/:id/update", charactersController.updateCharacterView);

router.post("/character/:id/update", charactersController.updateCharacter);

module.exports = router;
