module.exports = class TimeZoneDto {
    constructor(model) {
      this.id = model.id;
      this.tz = model.tz;
      this.offset = model.offset;
    }
  };
  