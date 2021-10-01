const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("Este campo no puede estar vacio!")
    .normalizeEmail()
    .isEmail()
    .withMessage("El email es invalido. Ej:name@mail.com")
    .bail(),
  body("email").custom((value,  {req}) => {
    return db.User.findOne({ where: { email: value } })
      .then((user) => {
        if (!user || !bcrypt.compareSync(req.body.password, user.password)){
          return Promise.reject()
        }
      })
      .catch(() => {
        return Promise.reject("Credenciales invalidas!");
      });
  })
];