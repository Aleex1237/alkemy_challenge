const { check, body } = require("express-validator");
const path = require("path");
const db = require("../database/models");
module.exports = [
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
  body("name")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .isLength({ max: 100 })
    .withMessage("Este campo acepta un maximo de 100 caracteres")
    .custom((value, { req }) => {
      return db.Genre.findOne({where: { name: value }})
        .then((genre) => {
          if (genre) {
            return Promise.reject();
          }

        })
        .catch(() => {
          
          return Promise.reject("El genero ya existe");
        });
    }),
];
