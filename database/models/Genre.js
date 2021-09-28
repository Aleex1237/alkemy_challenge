module.exports = (sequelize, dataTypes) => {
  let alias = "Genre";

  let cols = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    imagen: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
  };

  let config = {
    tableName: "genres",
    timestamps: false,
  };

  const Genre = sequelize.define(alias, cols, config);

  Genre.associate = (models) => {
    Genre.hasMany(models.Movie, {
      as: "movies",
      foreignKey: "idGenre",
    });
  };

  return Genre;
};
