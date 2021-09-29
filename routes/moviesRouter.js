var express = require("express");
var router = express.Router();

//Middlewares & Validations
let upload = require("../middlewares/multerMoviesConfig");
let moviesValidator=require("../validations/MovieValidator")

//Controllers
let moviesController = require("../controllers/moviesControllers");

//LIST, DETAIL AND SEARCH
router.get("/search", moviesController.search);
router.get("/", moviesController.list);
router.get("/:id", moviesController.detail);


//CRUD routes
router.post("/", upload.single("image"),moviesValidator ,moviesController.create);
router.put("/:id", upload.single("image"), moviesController.update);
router.delete("/:id", moviesController.delete);

//ASSOCIATE MOVIES TO CHARACTERS OR CHARACTERS TO MOVIES
router.post("/associate", moviesController.associate);

module.exports = router;
