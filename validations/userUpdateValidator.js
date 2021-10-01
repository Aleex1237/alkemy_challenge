const { check, body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .isLength({ min: 4, max: 100 })
    .withMessage("El nombre debe tener almenos 4 letras y 100 como maximo")
    .bail(),
  check("password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .isStrongPassword()
    .withMessage(
      "La contraseña debe tener como minimo 8 caracteres, una letra minuscula, una mayuscula, un numero y almenos 1 simbolo"
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas deben coincidir");
    }
    return true;
  }),
];