const { Setting } = require('../db/models');
class SettingsService {

  async getUserSettings(id) {
    try {
      const settings = await Setting.findOne({ where: {userId: id} });
      return settings;
    } catch (error) {
      console.error(error);
    }
  }
  

  async updateUserSettings(params) {
    const settings = await Setting.update(
      {
        ...params,
      },
      { where: { id: params.settingId} }
    );

    return settings;
  }
 
  async updateUserSettingsByUserId(params) {
    const settings = await Setting.update(
     {
       ...params.settings,
     },
     { where: { userId: params.userId} }
   );

   return settings;
  }

  async updateUserSettingsByUserId(params) {
     const settings = await Setting.update(
      {
        ...params.settings,
      },
      { where: { userId: params.userId} }
    );

    return settings;
  }

  async createUserSettings(params) {
    const settings = await Setting.create({ ...params});
    return settings;
  }

}

module.exports = new SettingsService();


