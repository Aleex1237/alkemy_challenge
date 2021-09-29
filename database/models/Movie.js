module.exports = (sequelize, dataTypes) => {
  //Alias del modelo (NO ES EL NOMBRE DE LA TABLA)
  let alias = "Movie";

  //Columnas
  let cols = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    title: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(255),
      allowNull: true,
    },

    rating: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    idGenre: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  //Configuración del modelo
  let config = {
    timestamps: true,
    tableName: "movies",
  };

  const Movie = sequelize.define(alias, cols, config);

  Movie.associate = (models) => {
    Movie.belongsTo(models.Genre, {
      as: "genres",
      foreignKey: "idGenre",
    });

    Movie.belongsToMany(models.Character, {
      as: "characters",
      through: "MovieCharacter",
      foreignKey: "idMovie",
      otherKey: "idCharacter",
      timestamps: false,
    });
  };

  return Movie;
};
