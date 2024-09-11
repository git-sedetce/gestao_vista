'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mes: {
        type: Sequelize.STRING
      },
      ano: {
        type: Sequelize.STRING
      },
      tipo_evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tipo_Eventos', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },      
      sexec_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Secretaria_Executivas', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      }, 
      nome_evento: {
        type: Sequelize.STRING
      },          
      descricao: {
        type: Sequelize.STRING(500)
      },
      publico_alvo: {
        type: Sequelize.STRING
      },
      tipo_local_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tipo_Locals', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      local: {
        type: Sequelize.STRING
      },
      periodo: {
        type: Sequelize.STRING
      },
      custo_previo: {
        type: Sequelize.STRING
      },
      recursos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tipo_Recursos', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      participacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tipo_Participacaos', key: 'id' },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },      
      lead_previsto: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Eventos');
  }
};