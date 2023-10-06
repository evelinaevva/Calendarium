const { Scheduler } = require('../db/models');
const {lastScheduleDate, reccurenceType} = require('../controllers/default.app.settings');

class SchedileService {
  async findSchedile(id) {
    const schedile = await Scheduler.findByPk(id);

    return schedile;
  }

  async createSchedile(params) {
 
    const schedule = await Scheduler.create({ ...params});
   
    return schedule;
  }

  getTaskSchedule(task, startDate, endDate, limit, format) {
    if (format == undefined) {
      format = 'short';
    } else {
      format = 'full';
    }
    if (limit == undefined) {
      limit = 50;
    }
    if (!startDate) {
      startDate = new Date(task.targetDateTime);
    } else {
      startDate = new Date(startDate);
    }
    if (!endDate) {
      endDate = lastScheduleDate;
    } else {
      endDate = new Date(endDate);
    } 
    const lastDate = lastScheduleDate; 
    const {reccurenceTypeId} = task.scheduler;
    const data = [];
    let nextDate = new Date(task.targetDateTime);
    if (nextDate >= startDate) {
      data.push(new Date(nextDate));
    }
    do {
      switch (reccurenceType[reccurenceTypeId]) {
        case 'dayOfWeek':
          nextDate.setDate(nextDate.getDate() + 1);
          if (nextDate >= startDate) {
            if (task.scheduler.mon && nextDate.getDay() === 1) {
              data.push(new Date(nextDate));
            }
            if (task.scheduler.tue && nextDate.getDay() === 2) {
              data.push(new Date(nextDate));
            }
            if (task.scheduler.wed && nextDate.getDay() === 3) {
              data.push(new Date(nextDate));
            }
            if (task.scheduler.thu && nextDate.getDay() === 4) {
              data.push(new Date(nextDate));
            }
            if (task.scheduler.fri && nextDate.getDay() === 5) {
              data.push(new Date(nextDate));
            }
            if (task.scheduler.sat && nextDate.getDay() === 6) {
              data.push(new Date(nextDate));
            }
            if (task.scheduler.sun && nextDate.getDay() === 0) {
              data.push(new Date(nextDate));
            }
          }
          break;

        case "daily":
          nextDate.setDate(nextDate.getDate() + 1);
          if (nextDate >= startDate) {
            data.push(new Date(nextDate));
          }
          break;

        case 'weekly':
          nextDate.setDate(nextDate.getDate() + 7);
          if (nextDate >= startDate) {
            data.push(new Date(nextDate));
          }
          break;
  
        case 'monthly':
          nextDate.setMonth(nextDate.getMonth() + 1);
          if (nextDate >= startDate) {
            data.push(new Date(nextDate));
          }
          break;

        case 'annualy':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          if (nextDate >= startDate) {
            data.push(new Date(nextDate));
          }
          break;

        default:
          data.push(lastDate);
          break;
      }
    } 
    while (nextDate.getTime() <= endDate.getTime() && nextDate.getTime() <= lastDate.getTime());
    return({...task, schedulerArr: data})
  }

}

module.exports = new SchedileService();


