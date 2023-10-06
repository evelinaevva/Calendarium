const { TimeZone } = require('../db/models');
const TimeZoneDto = require('../dto/tz.dto');

class TimeZoneService {

  async getTimeZones() {
    const tzs = await TimeZone.findAll();
    const tzArr = tzs.map((tz) => new TimeZoneDto(tz));
    return tzArr;
  }

}

module.exports = new TimeZoneService();


