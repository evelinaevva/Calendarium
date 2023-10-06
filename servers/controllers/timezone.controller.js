const timezoneService = require('../services/timezone.service');

class TimeZoneController {
   
   async getTimeZones(req, res, next) {
    try {
      const timeZones = await timezoneService.getTimeZones();
      res.json({timeZones});
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new TimeZoneController();

