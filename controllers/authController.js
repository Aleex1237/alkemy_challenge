const db = require('../database/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { SENDGRID_API } = require('../config/key');

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: { api_key: SENDGRID_API }
  })
);

module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    try {
      if (errors.isEmpty()) {
        const user = await db.User.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password)
        });

        transporter.sendMail({
          to: user.email,
          from: 'alexis10893123@hotmail.com',
          subject: 'holis',
          html: `<h3>Email de bienvenida</h3>
              <p>Bienvenido ${user.name}</p>`
        });

        return res.status(201).json({
          status: 201,
          msg: 'Usuario creado satisfactoriamente!. Verifique su email :)'
        });
      } else {
        return res.status(400).json({
          status: 400,
          msg: 'Hubo un error al crear el usuario',
          errores: errors.mapped()
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const user = await db.User.findOne({
          where: { email: req.body.email }
        });

        const userForToken = {
          id: user.id,
          name: user.name
        };

        const token = jwt.sign(userForToken, process.env.SECRET, {
          expiresIn: '10h'
        });

        res.status(200).json({
          status: 200,
          msg: `Inserte este token en la pestaña Authorization > Bearer Token`,
          token
        });
      } catch (error) {
        console.log(err);
        return res.status(500).json(err);
      }
    } else {
      return res.status(400).json({
        status: 400,
        errors: errors.mapped(),
        msg: 'credenciales invalidas'
      });
    }
  }
};
