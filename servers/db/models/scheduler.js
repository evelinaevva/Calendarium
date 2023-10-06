'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scheduler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Task, {foreignKey: 'taskId'})
    }
  }
  Scheduler.init({
    taskId: DataTypes.INTEGER,
    dayOfWeek: DataTypes.STRING,
    reccurenceTypeId: DataTypes.INTEGER,
    mon: DataTypes.BOOLEAN,
    tue: DataTypes.BOOLEAN,
    wed: DataTypes.BOOLEAN,
    thu: DataTypes.BOOLEAN,
    fri: DataTypes.BOOLEAN,
    sat: DataTypes.BOOLEAN,
    sun: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Scheduler',
  });
  return Scheduler;
};