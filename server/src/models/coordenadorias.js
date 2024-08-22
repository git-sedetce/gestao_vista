'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coordenadorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coordenadorias.belongsTo(models.Secretaria_Executivas, {
        foreignKey: 'sexec_id', as: 'ass_coord_sexec'
      });
      Coordenadorias.hasMany(models.Evento, {
        foreignKey: 'coord_id', as: 'ass_coord_evento'
      });
      // define association here
    }
  }
  Coordenadorias.init({
    coordenadoria: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coordenadorias',
  });
  return Coordenadorias;
};