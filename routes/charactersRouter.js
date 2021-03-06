var express = require("express");
var router = express.Router();

//Middlewares and validations
const upload = require("../middlewares/multerCharacterConfig");
const addCharacterValidator = require("../validations/addCharacterValidator")
//Controllers
var charactersController = require("../controllers/charactersController");

router
  .get("/", charactersController.list) //List allCharacters
  .get("/search", charactersController.search)//search characters by params
  .get("/:id", charactersController.detail) //A specific character
  
  .post("/", upload.single("image"),addCharacterValidator ,charactersController.addCharacter) //Create
  .put("/:id", upload.single("image"),addCharacterValidator ,charactersController.updateCharacter) //Update
  .delete("/:id", charactersController.deleteCharacter);

module.exports = router;
