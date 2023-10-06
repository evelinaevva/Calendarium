const {Op } = require('sequelize');
const fs = require('fs').promises;
const path = require('path');
const { Task, Scheduler, User, Setting } = require('../db/models');
const TaskDto = require('../dto/task.dto');
const schedulerService = require('./scheduler.service');

class TaskService {

  async getTask(taskId) {
    const task = await Task.findOne({
      where: { id: taskId },
      include: [
        { model: Scheduler },
      ],
    });
    return task;
  }

  async getAllTaskWithSchedule(params) {
    const tasks = await Task.findAll({
      where: { userId: params.userId },
      include: [
        { model: Scheduler },
      ],
    });
  
    const tasksWithSchedule = tasks.map((tsk) => {
      const task = new TaskDto(tsk);
      if  (task.reccuring) {
        return(schedulerService.getTaskSchedule(task, params.startDate, params.endDate, params.limit));
      } else {
        return task;
      }
    });
    return tasksWithSchedule ;
  }

  
  async getAllTasks(userId) {
    const task = await Task.findAll({
      where: { userId: userId },
      include: [
        { model: Scheduler },
      ],
    });
    return task;
  }

  async getUpcomingTasks(endDate) {
    const tasks = await Task.findAll({
      where: {
        [Op.and]: [
          {
            notificationTime : {
              [Op.lt]: endDate
            },
            [Op.or]: [
              { emailSent: null }, 
              { messageSent: null },
              { emailSent: false }, 
              { messageSent: false },
            ],
          },
        ]
      },
      include: {
        model: User,
        include: [{model: Setting}]
      }
    });
    return tasks;
  }

   // Обновить время уведомления для задачи. Входной параметр - taskId/
  // Данный метод вызывается сразу полсе добавления новой задачи, либо после изменения задачи.
  async updateNotificationTime(taskId) {
    try {
      const task = await this.getTask(taskId);
      let notificationTime = '';
      if (task?.id && task?.reccuring) {
          if (task.notificationTime === null || task.notificationTime === undefined ) {
            notificationTime = new Date(task.targetDateTime);
          } else {
              notificationTime = new Date(
              task.notificationTime.getFullYear(), 
              task.notificationTime.getMonth(), 
              task.notificationTime.getDate(), 
              task.targetDateTime.getHours(), 
              task.targetDateTime.getMinutes());
          }
          notificationTime.setMinutes(notificationTime.getMinutes() - task.offsetNotify);
          const updatedTask = await Task.update(
            {
              notificationTime,
              emailSent: false,
              messageSent: false,
            },
            { where: {id: task.id} }
            );
      }
      if (task?.id && !task?.reccuring) {
        notificationTime = new Date(task.targetDateTime);
        notificationTime.setMinutes(notificationTime.getMinutes() - task.offsetNotify);
        const updatedTask = await Task.update(
          {
            notificationTime,
            emailSent: false,
            messageSent: false,
          },
          { where: {id: task.id} }
          );
      }
       return {success: true};
    } catch (error) {
      console.error(error);
    }
  }


  // Переустановить время уведомления для задачи. Входной параметр - taskId
  // Метод используется после отправки уведомлений по задаче, устанавливает следующую 
  // дату уведомления на основании расписания 

  async setNextNotificationDate(taskId) {
    try {
      const task = await this.getTask(taskId);
      const taskWithSheduler = await schedulerService.getTaskSchedule(
        new TaskDto(task), 
        new Date(task.notificationTime.getFullYear(), task.notificationTime.getMonth(), task.notificationTime.getDate()), '', 2, 'full');
      if (taskWithSheduler.id && taskWithSheduler.reccuring) {
        const notificationTime = new Date(taskWithSheduler.schedulerArr[1]);
        notificationTime.setMinutes(notificationTime.getMinutes() - task.offsetNotify);
        const updatedTask = await Task.update(
          {
            notificationTime,
            messageSent: false,
            emailSent: false,
          },
          { where: {id: task.id} }
          );
        return {success: true, notificationTime: notificationTime};
      }
       return {success: false, msg: 'у задачи отсутствует планировщик'};
    } catch (error) {
      return {success: false, msg: 'произошла ошибка при обновлении даты уведомления'};
    }
  }

  // данный метод необходимо вызывать после оповещения пользователя по email или telegram,
  // он устанавливает значения  messageSent или emailSent в true.
  async confirmNotificationDev(taskId, serverType, UserTgNotifyValue) {
    try {
      let task = '';
      switch (serverType) {
        case 'tgNotify':
          task = await this.updateTask({id: taskId, messageSent: true});
          break;
        case 'emailNotify':
          task = await this.updateTask({id: taskId, emailSent: true});
          break;
      
        default:  
          return {success: false, msg: 'такого метода на существует'};
          break;
      }

      task = await this.getTask(taskId);
      if (task.messageSent && task.emailSent || task.emailSent && !UserTgNotifyValue) {
        await this.setNextNotificationDate(taskId);
      }
 
      return {success: true};
    } catch (error) {
      return {success: false, msg: 'произошла ошибка при обновлении даты уведомления'};
    }
  }



  async createTask(params) {
    const task = await Task.create({ ...params});
    return task;
  }

  async updateTask(params) {
    const task = await Task.update(
      {
        ...params,
      },
      { where: { id: params.id } }
    );
    if (params.scheduler) {
       const scheduler = await Scheduler.update(
        {
          ...params.scheduler,
        },
        { where: { taskId: params.id} }
      );
    }  
    return task;
  }


  async deleteImg(fileName) {
    try {
      await fs.unlink(path.join(process.cwd(),'uploads', fileName));
      return({success: true})
    } catch (err) {
      return({success: false, msg: JSON.stringify(err)})
    }
  }

  async deleteTask(id) {
    let task = await this.getTask(id);
    if (task?.imgContent) {
      await this.deleteImg(task.imgContent);
    }
    task = await Task.destroy({ where: { id: id } });
    return task;
  }

  
 
}

module.exports = new TaskService();


