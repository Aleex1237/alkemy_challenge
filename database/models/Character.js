module.exports = (sequelize, dataTypes) => {
  //Alias del modelo (NO ES EL NOMBRE DE LA TABLA)
  let alias = "Character";

  //Columnas
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
    image: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },

    age: {
      type: dataTypes.INTEGER.UNSIGNED,
    },
    weight: {
      type: dataTypes.DECIMAL(4, 2).UNSIGNED,
    },
    history: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
  };

  //Configuración del modelo
  let config = {
    timestamps: false,
    tableName: "characters",
  };

  const Character = sequelize.define(alias, cols, config);

  //Asociaremos el modelo Actor con algun otro modelo.
  Character.associate = (models) => {
    //A un actor le pertenecen muchas peliculas o dicho de otra forma. Un actor trabajó en muchas peliculas.
    Character.belongsToMany(models.Movie, {
      as: "movies", //Como nos referimos a la asocación en el controlador
      through: "MovieCharacter", //La tabla intermedia
      foreignKey: "idCharacter", //La clave foranea que le corresponde al modelo a asociar
      otherKey: "idMovie", //La otra clave foranea con la que asociaremos el modelo
      timestamps: false, //Sin marcas de tiempo
    });
  };

  return Character;
};
