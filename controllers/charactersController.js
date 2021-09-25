const db = require("../database/models");

module.exports = {
  list: (req, res) => {
    let newsCharacter = [];
    db.Character.findAll({
      attributes: {
        nombre,
        imagen
      }
    })
      .then((result) => {
        result.forEach((result) => {
          if (result.nombre && result.imagen) {
            let character = {
              nombre: result.nombre,
              imagen: result.imagen,
            };
            newsCharacter.push(character);
          }
        });
        return newsCharacter;
      })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  },

  //CREATE
  addCharacterView: (req, res) => {
    res.render("addCharacter");
  },

  addCharacter: (req, res) => {
    db.Character.create({
      imagen: req.body.imagen,
      nombre: req.body.nombre,
      edad: req.body.edad,
      peso: req.body.peso,
      historia: req.body.historia,
    });
    res.redirect("/characters");
  },

  //UPDATE
  updateCharacterView: (req, res) => {
    db.Character.findByPk(req.params.id)
      .then((character) => {
        res.render("updateCharacter", { character });
      })
      .catch((err) => console.log(err));
  },

  updateCharacter: (req, res) => {
    db.Character.update(
      {
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        edad: req.body.edad,
        peso: req.body.peso,
        historia: req.body.historia,
      },
      { where: { id: req.params.id } }
    );
    res.redirect("/characters/character/"+req.params.id+"/update");
  },
};
