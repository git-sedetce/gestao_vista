'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Evento.belongsTo(models.Secretaria_Executivas, { foreignKey: 'sexec_id', as: 'ass_evento_sexec' });
      Evento.belongsTo(models.Tipo_Evento, { foreignKey: 'tipo_evento_id', as: 'ass_evento_tipo' });
      Evento.belongsTo(models.Tipo_Local, { foreignKey: 'tipo_local_id', as: 'ass_evento_local' });
      Evento.belongsTo(models.Tipo_Participacao, { foreignKey: 'participacao_id', as: 'ass_evento_participacao' });
      Evento.belongsTo(models.Tipo_Recursos, { foreignKey: 'recursos_id', as: 'ass_evento_recursos' });
      Evento.hasMany(models.Anexo, { foreignKey: 'evento_id', as: 'ass_evento_anexo' });
      Evento.hasMany(models.Acompanhamento, { foreignKey: 'evento_id', as: 'ass_evento_acompanhamento' });
      // define association here
    }
  }
  Evento.init({
    mes: DataTypes.STRING,
    ano: DataTypes.STRING,
    nome_evento: DataTypes.STRING,
    descricao: DataTypes.STRING,
    publico_alvo: DataTypes.STRING,
    local: DataTypes.STRING,
    periodo: DataTypes.STRING,
    custo_previo: DataTypes.STRING,
    lead_previsto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};