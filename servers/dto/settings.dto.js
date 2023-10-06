module.exports = class SettingsDto {
    constructor(model) {
      this.settingId = model.id;
      this.tgNotify = model.tgNotify;
      this.emailNotify = model.emailNotify;
      this.timezoneId = model.timezoneId;
      this.tgChatId = model.tgChatId;
    }
  };

  