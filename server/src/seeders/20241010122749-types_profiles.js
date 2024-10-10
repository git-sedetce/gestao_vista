'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Profiles', [
      {
      perfil: 'user',
      is_master: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },    
    {
      perfil: 'coordenador',
      is_master: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      perfil: 'admin',
      is_master: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Profiles', null, {});

  }
};
