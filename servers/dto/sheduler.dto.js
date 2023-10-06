module.exports = class SchedulerDto {
    constructor(model) {
      this.id = model.id;
      this.taskId = model.taskId;
      this.dayOfWeek = model.dayOfWeek;
      this.reccurenceTypeId = model.reccurenceTypeId;
      this.mon = model.mon;
      this.tue = model.tue;
      this.wed = model.wed;
      this.thu = model.thu;
      this.fri = model.fri;
      this.sat = model.sat;
      this.sun = model.sun;
    }
  };
