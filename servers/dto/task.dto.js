const SchedulerDto = require("./sheduler.dto");

module.exports = class TaskDto {
    constructor(model) {
      this.id = model.id;
      this.userId = model.userId;
      this.title = model.title;
      this.textContent = model.textContent;
      this.imgContent = model.imgContent;
      this.targetDateTime = model.targetDateTime;
      this.notificationTime = model.notificationTime;
      this.duration = model.duration;
      this.reccuring = model.reccuring;
      this.offsetNotify = model.offsetNotify;
      this.scheduler = model.Scheduler ? new SchedulerDto(model.Scheduler) : null;
    }
  };


  