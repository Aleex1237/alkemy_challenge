const db = require("../database/models");

module.exports = {
    list : (req,res) => {
        db.Movie.findAll({include : [{association : "genres"}]})
        .then((movies) => {
            res.send(movies)
        }).catch((err) => {
            console.log(err)
        });
    }
}