'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Acompanhamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Acompanhamento.belongsTo(models.Evento, { foreignKey: 'evento_id', as: 'ass_acompanhamento_evento' })
      // define association here
    }
  }
  Acompanhamento.init({
    situacao_atual: DataTypes.STRING,
    resultado: DataTypes.STRING,
    custo_realizado: DataTypes.STRING,
    leads_realizados: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Acompanhamento',
  });
  return Acompanhamento;
};