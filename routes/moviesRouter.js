var express = require("express");
var router = express.Router();

//Middlewares & Validations
let upload = require("../middlewares/multerMoviesConfig");

//Controllers
let moviesController = require("../controllers/moviesControllers");

router.get("/", moviesController.list);
router.post("/", upload.single("image"), moviesController.create);
router.get("/:id", moviesController.detail);

router.put("/:id", upload.single("image"), moviesController.update);
router.delete("/:id", moviesController.delete); 
router.post("/associate", moviesController.associate);

module.exports = router;
