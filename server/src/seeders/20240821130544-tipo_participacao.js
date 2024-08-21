"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tipo_Participacaos",
      [
        {
          participacao: "Participação",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          participacao: "Participação com Stand",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          participacao: "Patrocínio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          participacao: "Patrocínio com stand",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          participacao: "Realização",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tipo_Participacaos", null, {});
  },
};
