'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      textContent: {
        type: Sequelize.TEXT
      },
      imgContent: {
        type: Sequelize.STRING
      },
      targetDateTime: {
        type: Sequelize.DATE
      },
      notificationTime: {
          type: Sequelize.DATE  
      },
      duration: {
        type: Sequelize.INTEGER
      },
      reccuring: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      offsetNotify: {
        type: Sequelize.INTEGER
      },
      emailSent: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      messageSent: {
        type: Sequelize.BOOLEAN,
        default: false,
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
    await queryInterface.dropTable('Tasks');
  }
};
