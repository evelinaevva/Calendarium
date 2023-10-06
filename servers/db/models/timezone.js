'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeZone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       this.hasMany(models.Setting, {foreignKey: 'timezoneId'})
    }
  }
  TimeZone.init({
    tz: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    offset: {
      type: DataTypes.BIGINT,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'TimeZone',
  });
  return TimeZone;
};