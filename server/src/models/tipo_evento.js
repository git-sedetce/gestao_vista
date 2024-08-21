'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tipo_Evento.init({
    nome_evento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo_Evento',
  });
  return Tipo_Evento;
};