'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_Participacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tipo_Participacao.hasMany(models.Evento, {
        foreignKey: 'participacao_id', as: 'ass_participacao_evento'
      });
      // define association here
    }
  }
  Tipo_Participacao.init({
    participacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo_Participacao',
  });
  return Tipo_Participacao;
};