'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secretaria_Executivas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Secretaria_Executivas.hasMany(models.Evento, {
        foreignKey: 'sexec_id', as: 'ass_sexec_evento'
      });
      // define association here
    }
  }
  Secretaria_Executivas.init({
    secretaria: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Secretaria_Executivas',
  });
  return Secretaria_Executivas;
};