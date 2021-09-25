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
    imagen: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    edad: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: dataTypes.DECIMAL(5, 2).UNSIGNED,
      allowNull: false,
    },
    historia: {
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
  Actor.associate = (models) => {
    //A un actor le pertenecen muchas peliculas o dicho de otra forma. Un actor trabajó en muchas peliculas.
    Actor.belongsToMany(models.Movie, {
      as: "movies", //Como nos referimos a la asocación en el controlador
      through: "actor_movie", //La tabla intermedia
      foreignKey: "actor_id", //La clave foranea que le corresponde al modelo a asociar
      otherKey: "movie_id", //La otra clave foranea con la que asociaremos el modelo
      timestamps: false, //Sin marcas de tiempo
    });

    //A un actor le pertenecen muchos episodios o dicho de otra forma. Un actor trabajó en muchos episodios.
    Actor.belongsToMany(models.Episode, {
      as: "episodes", //Como nos referimos a la asocación en el controlador
      through: "actor_episode", //La tabla intermedia
      foreignKey: "actor_id", //La clave foranea que le corresponde al modelo a asociar
      otherKey: "episode_id", //La otra clave foranea con la que asociaremos el modelo
      timestamps: false, //Sin marcas de tiempo
    });
  };

  return Character;
};
