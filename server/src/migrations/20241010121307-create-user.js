'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_completo: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING
      },
      user_active: {
        type: Sequelize.BOOLEAN
      },
      user_password: {
        type: Sequelize.STRING
      },
      profile_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Profiles', key: 'id' }
      },
      sexec_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Secretaria_Executivas', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};