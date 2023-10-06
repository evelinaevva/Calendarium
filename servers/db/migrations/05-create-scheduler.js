'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedulers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tasks',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      dayOfWeek: {
        type: Sequelize.STRING
      },
      reccurenceTypeId: {
        type: Sequelize.INTEGER
      },
      mon: {
        type: Sequelize.BOOLEAN
      },
      tue: {
        type: Sequelize.BOOLEAN
      },
      wed: {
        type: Sequelize.BOOLEAN
      },
      thu: {
        type: Sequelize.BOOLEAN
      },
      fri: {
        type: Sequelize.BOOLEAN
      },
      sat: {
        type: Sequelize.BOOLEAN
      },
      sun: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Schedulers');
  }
};