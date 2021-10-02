const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  list: (req, res) => {
    db.Genre.findAll()
      .then((genres) => {
        res.status(200).json({
          status: 200,
          total: genres.length,
          data: genres,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  detail: (req, res) => {
    db.Genre.findByPk(req.params.id, {
      include: [{ association: "movies" }],
      attributes: ["id", "name", ["imagen", "image"]],
    })
      .then((genre) => {
        genre.dataValues.movies.forEach((movie) => {
          movie.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/character/${movie.id}`;
          movie.dataValues.id = undefined;
          movie.dataValues.image = undefined;
          movie.dataValues.rating = undefined;
          movie.dataValues.idGenre = undefined;
          movie.dataValues.createdAt = undefined;
          movie.dataValues.updatedAt = undefined;
        });

        return res.status(200).json({
          status: 200,
          data: genre,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  create: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Genre.create({
        name: req.body.name,
        imagen: req.file ? req.file.filename : "defaultGenre.png",
      })
        .then(() => {
          res.status(201).json({
            status: 201,
            msg: "Genero creado satisfactoriamente!.",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al crear el genero",
        errores: errors.mapped(),
      });
    }
  },

  update: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Genre.findByPk(req.params.id)
        .then((genre) => {
          db.Genre.update(
            {
              name: req.body ? req.body.name : genre.name,
              imagen: req.file ? req.file.filename : genre.image,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(201).json({
                status: 201,
                msg: "Genero actualizado satisfactoriamente!.",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al crear el genero",
        errores: errors.mapped(),
      });
    }
  },
  delete: (req, res) => {
    db.Genre.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(201).json({
          status: 201,
          msg: "Genero eliminado satisfactoriamente!.",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
