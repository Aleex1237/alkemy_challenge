const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  list: (req, res) => {
    db.Character.findAll({
      attributes: ["id", "name", "image"],
    })
      .then((characters) => {
        characters.forEach((character) => {
          character.dataValues.detalle = `${req.protocol}://${req.get(
            "host"
          )}/characters/${character.id}`;
          character.dataValues.id = undefined;
        });

        res.status(200).json({
          total: characters.length,
          status: 200,
          data: {
            characters,
          },
        });
      })
      .catch((err) => {
        console.log(err), res.status(500).json(err);
      });
  },

  detail: (req, res) => {
    db.Character.findByPk(req.params.id, {
      include: [{ association: "movies" }],
    })
      .then((character) => {
        character.dataValues.movies.forEach((movie) => {
          movie.dataValues.MovieCharacter = undefined;
          movie.dataValues.createdAt = undefined;
          movie.dataValues.updatedAt = undefined;
          movie.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/movies/${movie.id}`;
          movie.dataValues.id = undefined;
          movie.dataValues.image = undefined;
          movie.dataValues.idGenre = undefined;
        });

        character.dataValues.imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/characters/${character.image}`;

        return res.status(200).json({
          status: 200,
          data: character,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //FILTERS
  search: (req, res) => {
    db.Character.findAll({
      include: req.query.movie
        ? [
            {
              association: "movies",
              where: {
                id: { [Op.substring]: req.query.movie ? req.query.movie : "" },
              },
            },
          ]
        : null,
      where: {
        age: { [Op.substring]: req.query.age },
        name: { [Op.substring]: req.query.name },
      },
      attributes: ["id", "name", "image", "age"],
    })
      .then((characters) => {
        characters.forEach((character) => {
          character.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/characters/${character.id}`;
          character.dataValues.id = undefined;
        });

        return res.status(200).json({
          total: characters.length,
          status: 200,
          data: characters,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //CREATE

  addCharacter: (req, res) => {
    const { name, age, weight, history } = req.body;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Character.create({
        name: name,
        image: req.file ? req.file.filename : "defaultCharacter.png",
        age: +age,
        weight: weight,
        history: history,
      })
        .then(() => {
          res.status(201).json({
            status: 200,
            msg: "Usuario creado satisfactoriamente!.",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al crear el personaje",
        errores: errors.mapped(),
      });
    }
  },

  //UPDATE
  updateCharacter: (req, res) => {
    const { name, age, weight, history } = req.body;

    db.Character.findByPk(req.params.id)
      .then((character) => {
        db.Character.update(
          {
            name: name,
            image: req.file ? req.file.filename : character.image,
            age: +age,
            weight: +weight,
            history: history,
          },
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.status(200).json({
              status: 200,
              msg: "Usuario actualizado correctamente!",
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

  deleteCharacter: (req, res) => {
    db.Character.destroy({ where: { id: req.params.id } })
      .then(() => {
        return res.status(201).json("Personaje eliminado satisfactoriamente!.");
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  },
};
