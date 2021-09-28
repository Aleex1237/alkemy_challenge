module.exports = (sequelize, dataTypes) => {
  let alias = "MovieCharacter";

  let cols = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    idCharacter: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    idMovie: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    tableName: "moviescharacters",
    timestamps: false,
  };

  const movieCharacter = sequelize.define(alias, cols, config);

  return movieCharacter;
};
