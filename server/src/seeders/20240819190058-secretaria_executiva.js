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
      sigla: 'SEXEC-SIN',
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
      sigla: 'SEXEC-SAN',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Agência de Defesa Agropecuária do Estado do Ceará',
      sigla: 'ADAGRI',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Agência de Desenvolvimento do Estado do Ceará',
      sigla: 'ADECE',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Instituto de Pesos e Medidas do Estado do Ceará',
      sigla: 'IPEM-CE',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'Junta Comercial do Estado do Ceará',
      sigla: 'JUCEC',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'PECÉM - Complexo Industrial e Portuário',
      sigla: 'CIPP',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      secretaria: 'ZPE CEARÁ',
      sigla: 'ZPE',
      createdAt: new Date(),
      updatedAt: new Date()
     },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Secretaria_Executivas', null, {});
  }
};
