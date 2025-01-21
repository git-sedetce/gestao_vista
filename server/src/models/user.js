'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Profile, { foreignKey: 'profile_id', as: 'ass_user_profile' })
      User.belongsTo(models.Secretaria_Executivas, { foreignKey: 'sexec_id', as: 'ass_user_sexec' })
      User.hasMany(models.Audit, { foreignKey: 'user_id', as: 'ass_users_audit' });
    }
  }
  User.init({
    nome_completo: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_active: DataTypes.BOOLEAN,
    user_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};