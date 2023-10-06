'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Scheduler, {foreignKey: 'taskId'});
      this.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Task.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textContent: DataTypes.TEXT,
    // imgContent: DataTypes.BLOB,
    imgContent: DataTypes.STRING,
    targetDateTime: DataTypes.DATE,
    notificationTime: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    reccuring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    offsetNotify: DataTypes.INTEGER,
    emailSent: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    messageSent: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
