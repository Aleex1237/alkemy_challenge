const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
  list: (req, res) => {
    db.User.findAll({ attributes: ["id", "name", "email"] })
      .then((users) => {
        users.forEach((user) => {
          user.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/users/${user.id}`;
        });
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  detail: (req, res) => {
    db.User.findByPk(req.params.id, { attributes: ["id", "name", "email"] })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  update: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.findByPk(req.params.id)
        .then((user) => {
          db.User.update(
            {
              name: req.body.name ? req.body.name : user.name,
              password: req.body.password? bcrypt.hashSync(req.body.password): user.password,
            },
            { where: { id: req.params.id } }
          ).then(() => {
            res.redirect("/users")
          }).catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.json({
        status: 500,
        msg: "Hubo un error al actualizar los datos del usuario",
        errores: errors.mapped(),
      });
    }
  },

  delete: (req, res) => {
    db.User.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.json("Usuario eliminado satisfactoriamente!.");
      })
      .catch((err) => {
        return res.json(err);
      });
  },
};
