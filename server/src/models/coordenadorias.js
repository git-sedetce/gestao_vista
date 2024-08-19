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
        foreignKey: 'sexec_id'
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