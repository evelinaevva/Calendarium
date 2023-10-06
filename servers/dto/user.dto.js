const SettingsDto = require ('./settings.dto');
module.exports = class UserDto {

  constructor(model, settings) {
    this.id = model.id;
    this.login = model.login;
    this.email = model.email;
    this.settings = new SettingsDto(settings);
  }
};
