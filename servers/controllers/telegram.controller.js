const { validationResult } = require('express-validator');
const ApiError = require('../errors/api.error');
const userService = require('../services/user.service');
const settingsService = require('../services/settings.service');
const taskService = require('../services/task.service');
const SettingsDto = require('../dto/settings.dto');
const EventDto = require('../dto/event.dto');

class TelegramController {

  async getUserSettings(req,res, next) {
    try {
      const userSetting = await settingsService.getUserSettings(req.params.userId);
      res.json({userId: req.params.userId, userSettings: new SettingsDto(userSetting)});
    } catch (e) {
      next(e);
    }

  }

  // возвращает массив chatId
  async getChatId(req,res, next) {
    try {
      const users = await userService.getAllUsers();
      const tgChatIds = users.map((user) => user.Setting.tgChatId)
      res.json(tgChatIds);
    } catch (e) {
      next(e);
    }
  }



  async getUserSettingsByEmail(req,res, next) {
    try {
      const user = await userService.findUser(req.params.email);
      if (user?.id) {
        const userSetting = await settingsService.getUserSettings(user.id);
        res.json({userId: user.id, email: user.email, userSettings: new SettingsDto(userSetting)});
      } else {
        res.json({msg: 'пользователь не найден'})
      }
    } catch (e) {
      next(e);
    }
  }

  async confirmNotificateTg(req, res, next) {
    try {
      const task = await taskService.confirmNotificationDev(+req.params.taskId, 'tgNotify');
      if (task.success) {
        res.json({success: true});
      } else {
        throw ApiError.ServerError(task.msg);
      }
    } catch (e) {
      next(e);
    }
  }

  async userSetSettings(req,res, next) {
    try {
      const userSetting = await settingsService.updateUserSettingsByUserId(req.body);
      res.json({success: true, settings: 'настройки успешно обновлены'});
    } catch (error) {
      console.log(error);
    }
  }

  // возвращает ближайшие задачи, по которым необходимо уведомить пользователя.
  async getUpcomingTasksTg(req, res, next) {
    try {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 1);
      let allTasks = await taskService.getUpcomingTasks(date);
      allTasks = allTasks.map((task)=> new EventDto(task));
      const tgTasks = allTasks.filter((task) => task.tgNotify === true && task.messageSent === false);
      res.json(tgTasks);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

}

module.exports = new TelegramController();

