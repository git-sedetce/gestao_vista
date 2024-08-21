'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_Local extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tipo_Local.init({
    local_evento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo_Local',
  });
  return Tipo_Local;
};