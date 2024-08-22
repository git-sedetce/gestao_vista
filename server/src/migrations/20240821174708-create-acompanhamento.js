'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Acompanhamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      situacao_atual: {
        type: Sequelize.STRING
      },
      resultado: {
        type: Sequelize.STRING
      },
      custo_realizado: {
        type: Sequelize.STRING
      },
      leads_realizados: {
        type: Sequelize.STRING
      },
      evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Eventos', key: 'id' },
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
    await queryInterface.dropTable('Acompanhamentos');
  }
};