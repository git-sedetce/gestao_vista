'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Secretaria_Executivas', [
      {
        secretaria: 'Secretaria do Desenvolvimento Econômico',
        sigla: 'SDE',
        createdAt: new Date(),
        updatedAt: new Date()
       },
      {
      secretaria: 'Secretaria Executiva da Indústria',
      sigla: 'SEXEC-IND',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Secretaria Executiva de Comércio, Serviços e Inovação',
      sigla: 'SEXEC-CSI',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Secretaria Executiva de Planejamento e Gestão Interna',
      sigla: 'SEXEC-PGI',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Secretaria Executiva do Agronegócio',
      sigla: 'SEXEC-AGR',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Secretaria_Executivas', null, {});
  }
};
