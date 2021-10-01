const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API } = require("../config/key");

const transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
  api_key:SENDGRID_API
  }
  }))

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
          transporter.sendMail({
            to: user.email,
            from: "alexis10893123@hotmail.com",
            subject: "holis",
            html: `<h3>Email de bienvenida</h3>
            <p>Bienvenido ${user.name}</p>`,  
          })
          .then(() => {
            res.json("Usuario creado satisfactoriamente!. Verifique su email :)");
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
};
