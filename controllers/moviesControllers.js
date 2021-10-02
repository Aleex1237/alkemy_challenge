const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  //MOVIES LIST
  list: (req, res) => {
    db.Movie.findAll({ attributes: ["id", "title", "image", "createdAt"] })
      .then((movies) => {
        movies.forEach((movie) => {
          movie.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/movies/${movie.id}`;
          movie.dataValues.id = undefined;
        });
        return res.status(200).json({
          status: 200,
          total: movies.length,
          movies,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //SEARCH MOVIES BY PARAMETERS
  search: (req, res) => {
    db.Movie.findAll({
      where: {
        title: { [Op.substring]: req.query.name },
        idGenre: { [Op.substring]: req.query.genre },
      },
      order: [["title", req.query.order ? req.query.order : "ASC"]],
      attributes: ["id", "title", "image", "createdAt"],
    })
      .then((movies) => {
        movies.forEach((movie) => {
          movie.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/movies/${movie.id}`;
          movie.dataValues.id = undefined;
        });

        return res.status(200).json({
          status: 200,
          total: movies.length ? movies.length : "No hay peliculas que mostrar",
          movies,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(500);
      });
  },

  //MOVIE DETAIL
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: [{ association: "characters" }, { association: "genres" }],
    })
      .then((movie) => {
        movie.dataValues.idGenre = undefined;
        movie.dataValues.genres.dataValues.id = undefined;
        movie.dataValues.genres.dataValues.imagen = undefined;
        movie.dataValues.updatedAt = undefined;
        movie.dataValues.characters.forEach((character) => {
          character.dataValues.MovieCharacter = undefined;
        });

        console.log();

        return res.status(200).json({
          status: 200,
          data: movie,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //CRUD

  //CREATE
  create: (req, res) => {
    const { title, rating, idGenre } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Movie.create({
        title: title,
        image: req.file ? req.file.filename : "defaultMovie.png",
        rating: +rating,
        idGenre: +idGenre,
      })
        .then(() => {
          return res.status(201).json({
            status: 201,
            msg: "Pelicula creada satisfactoriamente!.",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al crear la pelicula",
        errores: errors.mapped(),
      });
    }
  },

  //UPDATE
  update: (req, res) => {
    const { title, rating, idGenre } = req.body;

    db.Movie.findByPk(req.params.id)
      .then((movie) => {
        db.Movie.update(
          {
            title: title ? title : movie.title,
            image: req.file ? req.file.filename : movie.image,
            rating: +rating ? rating : movie.rating,
            idGenre: +idGenre ? idGenre : movie.idGenre,
          },
          { where: { id: req.params.id } }
        )
          .then(() => {
            return res.status(200).json({
              status: 200,
              msg: "Pelicula actualizada satisfactoriamente!.",
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
  },

  //DELETE
  delete: (req, res) => {
    db.Movie.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200).json({
          status: 200,
          msg: "Pelicula eliminada satisfactoriamente!",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  },

  //CRUD FINISH

  //ASSOCIATE MOVIES OR CHARACTERS
  associate: (req, res) => {
    const { idCharacter, idMovie } = req.body;
    db.MovieCharacter.create({
      idCharacter: idCharacter,
      idMovie: idMovie,
    })
      .then(() => {
        res.status(200).json({
          status: 200,
          msg: "Pelicula y personaje asociados!",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
