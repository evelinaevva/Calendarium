
module.exports = class EventDto {
    constructor(model) {
      this.taskId = model.id;
      this.userId = model.userId;
      this.title = model.title;
      this.textContent = model.textContent;
      this.targetDateTime = model.targetDateTime;
      this.notificationTime = model.notificationTime;
      this.emailSent = model.emailSent;
      this.messageSent = model.messageSent;
      this.offsetNotify = model.offsetNotify;
      this.userLogin = model.User ? model.User.login : null;
      this.userEmail = model.User ? model.User.email : null;
      this.tgNotify = model.User.Setting ? model.User.Setting.tgNotify : null;
      this.tgChatId = model.User.Setting ? model.User.Setting.tgChatId : null;
    }
  };


  