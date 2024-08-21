"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tipo_Eventos",
      [
        {
          nome_evento: "Conferência",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Congresso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Exposição",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Feira",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Missão",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Roadshow",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Seminário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome_evento: "Simpósio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tipo_Eventos", null, {});
  },
};
