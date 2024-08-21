"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tipo_Recursos",
      [
        {
          recursos: "Tesouro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recursos: "ADECE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tipo_Recursos", null, {});
  },
};
