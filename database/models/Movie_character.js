module.exports = (sequelize, dataTypes) => {
  let alias = "MovieCharacter";

  let cols = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    characterId: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    movieId: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    tableName: "movie_characters",
    timestamps: false,
  };

  const movieCharacter = sequelize.define(alias, cols, config);

  return movieCharacter;
};
