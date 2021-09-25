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
    imagen: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    titulo: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    calificacion: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    genreId: {
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

  return Movie;
};
