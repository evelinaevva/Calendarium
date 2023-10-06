'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('TimeZones', [
      {  
        tz:'UTC+02:00',
        offset: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tz:'UTC+03:00',
        offset: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tz:'UTC+05:00',
        offset: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tz:'UTC+07:00', 
        offset: 420,
        createdAt: new Date(),
        updatedAt: new Date(),
      },     
      {
        tz:'UTC+08:00', 
        offset: 480,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tz:'UTC+09:00', 
        offset: 540,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tz:'UTC+10:00', 
        offset: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },      
      {
        tz:'UTC+12:00', 
        offset: 720,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TimeZones', null, {});
  }
};
