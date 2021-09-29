const { check, body } = require("express-validator");
const path=require("path");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Este campo no debe estar vacio")
    .isLength({ max: 100 })
    .withMessage("Este campo acepta un numero de 100 caracteres").bail(),

    body("image").custom((value, { req }) => {
      let exceptedFile = [".jpg", ".png", ".jpeg", ".gif"];
  
      if (!req.file) {
        throw new Error("La imagen es requerida");
      }
  
      if (!exceptedFile.includes(path.extname(req.file.originalname))) {
        throw new Error(
          "El tipo de archivo no es admitido. Solo se permiten archivos png, jpg, jpeg, gif"
        );
      }
  
      return true;
    }),

  check("age").isInt().withMessage("Este campo solo acepta numeros enteros!."),

  check("weight")
    .isDecimal({force_decimal:true})
    .withMessage("Este campo solo acepta numeros decimales!."),

  check("history")
    .notEmpty()
    .withMessage("Este campo no puede estar vacio!.")
    .isLength({ max: 2000 }),
];
