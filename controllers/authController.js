const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
  register: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      })
        .then(() => {
          res.json("Usuario creado satisfactoriamente!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.json({
        status: 500,
        msg: "Hubo un error al crear el usuario",
        errores: errors.mapped(),
      });
    }
  },
};
