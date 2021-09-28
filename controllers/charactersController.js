const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  list: (req, res) => {
    db.Character.findAll({
      attributes: ["id", "name", ["image", "imagen"]],
    })
      .then((characters) => {
        characters.forEach((character) => {
          character.dataValues.detalle = `${req.protocol}://${req.get(
            "host"
          )}/characters/${character.id}`;
          character.dataValues.id = undefined;
        });

        res.json({
          total: characters.length,
          status: 200,
          data: {
            characters,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  detail: (req, res) => {
    db.Character.findByPk(req.params.id)
      .then((character) => {
        console.log(character);
        character.dataValues.imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/characters/${character.image}`;
        character.dataValues.id = undefined;

        res.json(character);
      })
      .catch((err) => {
        console.log(err);
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
      attributes: ["id", "name", "image"],
    })
      .then((characters) => {
        characters.forEach((character) => {
          character.dataValues.detalle = `${req.protocol}://${req.get(
            "host"
          )}/characters/${character.id}`;
          character.dataValues.id = undefined;
        });

        return res.json({
          total: characters.length,
          status: 200,
          data: characters,
        });
      })
      .catch((err) => {
        console.log(err);
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
          res.redirect("/characters");
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      return res.json({
        status:500,
        msg:"Hubo un error al crear la pelicula",
        errores: errors.mapped()
      })
    }
  },

  //UPDATE
  updateCharacter: (req, res) => {
    const { name, age, weight, history } = req.body;

    db.Character.update(
      {
        name: name,
        image: req.file ? req.file.filename : "defaultCharacter.png",
        age: +age,
        weight: +weight,
        history: history,
      },
      { where: { id: req.params.id } }
    );
    res.redirect(`/characters/${req.params.id}`);
  },

  //DELETE

  deleteCharacter: (req, res) => {
    db.Character.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.json("Character delete susscefully!.");
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  },
};
