var express = require("express");
var router = express.Router();
const upload=require("../middlewares/multerGenresConfig")

//Controllers
const genresController = require("../controllers/genresController");

//Validations
const genresValidator = require("../validations/genresValidator");

router.get("/", genresController.list);

router.get("/:id", genresController.detail);

router.post("/",upload.single("imagen"),genresValidator,genresController.create);

router.put("/:id",upload.single("imagen"), genresValidator,genresController.update);

router.delete("/:id", genresController.delete);

module.exports = router;
