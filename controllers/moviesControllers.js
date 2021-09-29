const db = require("../database/models");

module.exports = {
  list: (req, res) => {
    db.Movie.findAll({ attributes: ["id", "title", "image", "createdAt"] })
      .then((movies) => {
        movies.forEach((movie) => {
          movie.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/movies/${movie.id}`;
          movie.dataValues.id = undefined;
        });
        res.json({
          status: 200,
          total: movies.length,
          movies,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: [{ association: "characters" }, { association: "genres" }],
    })
      .then((movie) => {
        movie.dataValues.id = undefined;
        movie.dataValues.idGenre = undefined;
        movie.dataValues.genres.dataValues.id = undefined;
        movie.dataValues.genres.dataValues.imagen = undefined;
        movie.dataValues.updatedAt = undefined;
        movie.dataValues.characters.forEach(character => {
          character.dataValues.MovieCharacter = undefined;
        });
         
        console.log();

        res.json(movie);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //CRUD

  //CREATE
  create: (req, res) => {
    const { title, rating, idGenre } = req.body;

    db.Movie.create({
      title: title,
      image: req.file ? req.file.filename : "defaultMovie.png",
      rating: +rating,
      idGenre: +idGenre,
    })
      .then((movie) => {
        res.redirect(`/movies}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  update: (req, res) => {
    const { title, rating, idGenre } = req.body;

    db.Movie.findByPk(req.params.id)
      .then((movie) => {
        db.Movie.update(
          {
            title: title,
            image: req.file ? req.file.filename : movie.image,
            rating: rating,
            idGenre: idGenre,
          },
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.redirect(`/movies/${req.params.id}`);
          })
          .catch((err) => {});
      })
      .catch((err) => {
        console.log(err);
      });
  },
  delete: (req, res) => {
    db.Movie.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.json("Movie delete susscefully!.");
      })
      .catch((err) => {
        return res.json(err);
      });
  },

  associate: (req, res) => {
    const {idCharacter,idMovie } =req.body
    db.MovieCharacter.create({
      idCharacter: idCharacter,
      idMovie: idMovie,
    })
      .then(() => {
        res.json("Associattion created susscefully");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
