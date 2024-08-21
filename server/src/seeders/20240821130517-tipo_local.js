"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tipo_Locals",
      [
        {
          local_evento: "Estadual",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          local_evento: "Internacional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          local_evento: "Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          local_evento: "Nacional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tipo_Locals", null, {});
  },
};
