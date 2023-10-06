'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TimeZone, {foreignKey: 'timezoneId'});
      this.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Setting.init({
    userId: {
     type: DataTypes.BIGINT,
     allowNull:false,
    },
    tgNotify: DataTypes.BOOLEAN,
    emailNotify: DataTypes.BOOLEAN,
    timezoneId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tgLogin: DataTypes.STRING,
    tgChatId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};
