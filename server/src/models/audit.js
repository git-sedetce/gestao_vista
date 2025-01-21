'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Audit.belongsTo(models.User, { foreignKey: 'user_id', as: 'ass_audit_users' });
    }
  }
  Audit.init({
    tipo_acao: DataTypes.STRING,
    acao: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Audit',
  });
  return Audit;
};