module.exports = (sequelize, dataTypes) => {
  //Alias del modelo (NO ES EL NOMBRE DE LA TABLA)
  let alias = "User";

  //Columnas
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
    email: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
  };
  //Configuración del modelo
  let config = {
    timestamps: false,
    tableName: "users",
  };

  const User = sequelize.define(alias, cols, config);

  return User;
};
