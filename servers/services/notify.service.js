const taskService = require('./task.service');
const EventDto = require('../dto/event.dto');
const mailServer = require('../services/email.service')

class NotifyService {

  async notify(task) {
    const {userEmail, title, textContent, tgNotify, taskId, notificationTime, offsetNotify} = task;
    const date = new Date(notificationTime.setMinutes(notificationTime.getMinutes() + offsetNotify)).toUTCString();
    const res = await mailServer.send({
      fieldTo: userEmail, 
      fieldTitle: title, 
      fieldText: textContent, 
      date });
    if (res?.messageId) {
      const task = await taskService.confirmNotificationDev(
        +taskId, 
        'emailNotify', 
        tgNotify
      );
      if (task.success) {
        console.log('Nodemailer, Обновлена запись');
        return ({success: true})
      } else {
        throw Error('Nodemailer, ошибка при обновлении задачи')
      }
    } else {
      throw Error('Nodemailer, ошибка при отправке сообщения')
    }

  }
  async checkAndNotify() {
    try {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 2);
      const tasks = await taskService.getUpcomingTasks(date);
      let filteredTask = tasks.map((task)=> new EventDto(task))
      filteredTask = filteredTask.filter((task) => task.emailSent === false);
      if (filteredTask.length > 0) {
        for (let i = 0; i < filteredTask.length; i++) {
          this.notify(filteredTask[i]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

}

module.exports = new NotifyService();


