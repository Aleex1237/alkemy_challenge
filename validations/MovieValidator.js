const { check, body } = require("express-validator");
const db = require("../database/models");
const path = require("path");

module.exports = [
  check("title")
    .notEmpty()
    .withMessage("Este campo no puede estar vacio.")
    .isLength({ max: 100 })
    .withMessage("El maximo de caracteres permitidos es 100!")
    .bail(),
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
  check("rating")
    .notEmpty()
    .withMessage("Este campo no puede estar vacio")
    .isFloat({ min: 1.0, max: 5.0 })
    .withMessage("Este campo solo acepta numeros decimales ej: 4.0"),

  body("idGenre")
    .notEmpty()
    .withMessage("Es necesario asociar un genero a la pelicula!.")
    .isInt()
    .withMessage("Valor invalido")
    .custom((value, { req }) => {
      return db.Genre.findByPk(value)
        .then((gender) => {
          if (!gender) {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject("El genero no existe");
        });
    }),
];
