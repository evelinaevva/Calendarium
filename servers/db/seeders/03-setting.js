'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Settings', [
      {
        userId: 1,
        tgNotify: false,
        emailNotify: true,
        timezoneId: 2,
        tgLogin: null,
        tgChatId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        tgNotify: true,
        emailNotify: true,
        timezoneId: 2,
        tgLogin: null,
        tgChatId: 12345,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        tgNotify: false,
        emailNotify: true,
        timezoneId: 2,
        tgLogin: null,
        tgChatId: 12345,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Settings', null, {})
  }
};
