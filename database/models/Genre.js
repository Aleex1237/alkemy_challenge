module.exports = (sequelize, dataTypes) => {
  let alias = "Genre";

  let cols = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },
    nombre: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    imagen: {
      type: dataTypes.STRING(255),
    },
  };

  let config = {
    tableName: "genres",
    timestamps: false,
  };

  const Genre = sequelize.define(alias, cols, config);

  return Genre;
};
