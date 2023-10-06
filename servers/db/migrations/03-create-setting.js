'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      tgNotify: {
        type: Sequelize.BOOLEAN
      },
      emailNotify: {
        type: Sequelize.BOOLEAN
      },
      timezoneId: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'TimeZones',
          key: 'id',
        }
      },
      tgLogin: {
        type: Sequelize.TEXT
      },
      tgChatId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Settings');
  }
};
