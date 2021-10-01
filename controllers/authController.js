const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API } = require("../config/key");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

module.exports = {
  register: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      })
        .then((user) => {
          transporter
            .sendMail({
              to: user.email,
              from: "alexis10893123@hotmail.com",
              subject: "holis",
              html: `<h3>Email de bienvenida</h3>
            <p>Bienvenido ${user.name}</p>`,
            })
            .then(() => {
              res.json(
                "Usuario creado satisfactoriamente!. Verifique su email :)"
              );
            })
            .catch((err) => {
              console.log(err);
            });
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
  login: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({ where: { email: req.body.email } })
        .then((user) => {

          //Luego de loguear al usuario almacenaremos en una constante el objeto que contenta el id y name del usuario
          const userForToken ={
            id:user.id,
            name:user.name
          }
          //En la constante token almacenaremos el token firmado al loguearse
          const token = jwt.sign(userForToken, "Rexxas10893")

          res.json(token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({
        status: 400,
        errors: errors.mapped(),
        msg: "credenciales invalidas",
      });
    }
  },
};
