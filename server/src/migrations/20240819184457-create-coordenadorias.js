'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coordenadorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coordenadoria: {
        type: Sequelize.STRING
      },
      sigla: {
        type: Sequelize.STRING
      },
      sexec_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Secretaria_Executivas', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
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
    await queryInterface.dropTable('Coordenadorias');
  }
};