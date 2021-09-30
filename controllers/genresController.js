const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  list: (req, res) => {
    db.Genre.findAll()
      .then((genres) => {
        res.json({
          status: 200,
          total: genres.length,
          data: genres,
        });
      })
      .catch((err) => {
        console.log(err);
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

        res.json(genre);
      })
      .catch((err) => {
        console.log(err);
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
          res.redirect(`/genres`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.json({
        status: 500,
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
              res.redirect(`/genres/${req.params.id}`);
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
        msg: "Hubo un error al crear el genero",
        errores: errors.mapped(),
      });
    }
  },
  delete: (req, res) => {
    db.Genre.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.json("Genre delete susscefully!.");
      })
      .catch((err) => {
       console.log(err);
      });
  },
};
