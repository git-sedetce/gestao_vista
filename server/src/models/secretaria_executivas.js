'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secretaria_Executivas extends Model {
    
    static associate(models) {
      Secretaria_Executivas.hasMany(models.Evento, {
        foreignKey: 'sexec_id', as: 'ass_sexec_evento'
      });
      Secretaria_Executivas.hasMany(models.User, {
        foreignKey: 'sexec_id', as: 'ass_sexec_user'
      });
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