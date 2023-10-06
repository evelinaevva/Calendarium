"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "andrey",
          email: "mayskiy1035@yandex.ru",
          password: await bcrypt.hash("12345", 5),
          googleId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "andrey2",
          email: "nesya.bss.kursk@yandex.ru",
          password: await bcrypt.hash("12345", 5),
          googleId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "Александр",
          email: "89051328839as@gmail.com",
          password: "W;lfwen864320fjg4",
          googleId: "115004412491701334810",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
