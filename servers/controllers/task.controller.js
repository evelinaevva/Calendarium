
const { validationResult } = require('express-validator');
const ApiError = require('../errors/api.error');
const taskService = require('../services/task.service');
const TaskDto = require('../dto/task.dto');
const schedulerService = require('../services/scheduler.service');
const SchedulerDto = require('../dto/sheduler.dto');
const {defaultSchedulerSettings} = require('./default.app.settings');
const userService = require('../services/user.service');
const EventDto = require('../dto/event.dto');


class TaskController {
   async addTask(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Ошибка валидации', errors.array());
      }
      try {
        const parseBody=JSON.parse(req.body.task)
        let fileName = req.file;
        if (req.file?.path) {
          fileName = fileName.path.replace("\\", "/").split('/')[1];
        }
         const task = await taskService.createTask({...parseBody, imgContent: fileName});
        const scheduler = await schedulerService.createSchedile({...parseBody.scheduler, taskId: task.id});
        const setNotificationTime = await taskService.updateNotificationTime(task.id);
        res.json({success: true, message: "Задача добавлена", taskId: task.id});
      } catch (error) {
        console.error(error);
      }

    } catch (e) {
      next(e);
    }
  }

  // удалить задачу по taskId
  async deleteTask(req, res, next) {
    try {
      const task = await taskService.deleteTask(req.body.taskId);
      res.json(task);
    } catch (e) {
      next(e);
    }
  }

  // получить задачу по taskId
  async getTask(req, res, next) {
    try {
      const task = await taskService.getTask(+req.params.id);
      res.json(new TaskDto(task));
    } catch (e) {
      next(e);
    }
  }

  // возвращает ближайшие задачи, по которым необходимо уведомить пользователя по email.
  async getUpcomingTasks(req, res, next) {
    try {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 1);
      const tasks = await taskService.getUpcomingTasks(date);
      const filteredTask = tasks.map((task)=> new EventDto(task))
      res.json(filteredTask.filter((task) => task.emailSent === false));
    } catch (e) {
      next(e);
    }
  }



  async setNextNotificationTime(req, res, next) {
    try {
      const task = await taskService.setNextNotificationDate(+req.params.taskId);
      if (task.success) {
        res.json({success: true, notificationTime: task.notificationTime});
      } else {
        throw ApiError.ServerError(task.msg);
      }
    } catch (e) {
      next(e);
    }
  }


  async confirmNotificateEmail(req, res, next) {
    try {
      const task = await taskService.confirmNotificationDev(+req.body.taskId, 'emailNotify', req.body.tgNotify);
      if (task.success) {
        res.json({success: true});
      } else {
        throw ApiError.ServerError(task.msg);
      }
    } catch (e) {
      next(e);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const task = await taskService.getAllTaskWithSchedule(req.query);
      res.json(task);
    } catch (e) {
      next(e);
    }
  }

  // получить все задачи пользователя по userId
  async getUserTasks(req, res, next) {
    try {
      const alltasks = await taskService.getAllTasks(+req.params.userId);
      const alltasksDto = alltasks.map((task) => new TaskDto(task));

      res.json(alltasksDto);
    } catch (e) {
      next(e);
    }
  }

  // обновить задача по taskId

  async updateTask(req, res, next) {
    try {
      const parseBody=JSON.parse(req.body.task)

      let fileName = req.file;
      if (req.file?.path) {
        fileName = fileName.path.replace("\\", "/").split('/')[1];
      }
      const task = await taskService.updateTask({...parseBody, imgContent: fileName});
      if (+task != 1) {
        throw ApiError.ServerError(`Ошибка при обновлении задачи.`, errors.array());
      }
      const setNotificationTime = await taskService.updateNotificationTime(parseBody.id);
      res.json({success: true, msg: 'задача обновлена'});
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

}

module.exports = new TaskController();

