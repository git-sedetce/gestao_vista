'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Coordenadorias', [
      {
        coordenadoria: 'Gabinete',
        sigla: 'GAB',
        sexec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        coordenadoria: 'Assessoria de Comunicação',
        sigla: 'ASCOM',
        sexec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        coordenadoria: 'Assessoria de Controle Interno e Ouvidoria',
        sigla: 'ASCOU',
        sexec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Assessoria Jurídica',
        sigla: 'ASJUR',
        sexec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Assessoria de Promoção de Negócios',
        sigla: 'ASPRO',
        sexec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Atração do Agronegócio',
        sigla: 'COATA',
        sexec_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Inclusão Econômica para o Agronegócio',
        sigla: 'COINA',
        sexec_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria dos Recursos Hídricos para o Agronegócio',
        sigla: 'CORHA',
        sexec_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Pesquisa e Projetos Especiais para o Agronegócio',
        sigla: 'COPEA',
        sexec_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Atração de Negócios do Setor de Comercio e Serviços',
        sigla: 'CONEG',
        sexec_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Atração de Negócios de Inovação Tecnológica',
        sigla: 'COINO',
        sexec_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria do Observatório Econômico e Data Science',
        sigla: 'COEDS',
        sexec_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Atração de Empreendimentos Industriais',
        sigla: 'COEMI',
        sexec_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Inclusão Econômica para Setor Industrial',
        sigla: 'COINI',
        sexec_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Atração de Empreendimentos Industriais Estruturantes',
        sigla: 'COINE',
        sexec_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Atração de Empreendimentos Industriais Especiais',
        sigla: 'COIES',
        sexec_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Planejamento e Desenvolvimento Institucional',
        sigla: 'COPLA',
        sexec_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria Administrativo-Financeira',
        sigla: 'COAFI',
        sexec_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
       },        
       {
        coordenadoria: 'Coordenadoria de Gestão de Pessoas',
        sigla: 'COGEP',
        sexec_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
       },  
       {
        coordenadoria: 'Coordenadoria de Tecnologia da Informação e Comunicação',
        sigla: 'COTEC',
        sexec_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
       },  

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Coordenadorias', null, {});
  }
};
