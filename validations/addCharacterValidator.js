const { check, body } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Este campo no debe estar vacio")
    .isLength({ max: 100 })
    .withMessage("Este campo acepta un numero de 100 caracteres"),

  check("age").isInt().withMessage("Este campo solo acepta numeros enteros!."),

  check("weight")
    .isDecimal({force_decimal:true})
    .withMessage("Este campo solo acepta numeros decimales!."),

  check("history")
    .notEmpty()
    .withMessage("Este campo no puede estar vacio!.")
    .isLength({ max: 2000 }),
];
