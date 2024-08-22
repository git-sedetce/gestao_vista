'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_Recursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tipo_Recursos.hasMany(models.Evento, {
        foreignKey: 'recursos_id', as: 'ass_recursos_evento'
      });
      // define association here
    }
  }
  Tipo_Recursos.init({
    recursos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo_Recursos',
  });
  return Tipo_Recursos;
};