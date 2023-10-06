const cron = require("node-cron");

// функция для получения настроек пользователя для уведомления по телеграмм
const settingVerification = (tgChatId, stop, sender) => {
  const settingVerificationJob = cron.schedule('* * * * *', async () => {

    const responseTask = await fetch('http://localhost:5000/api/tg/upcoming');
    const responseTaskJson = await responseTask.json();

    const filterResponseTaskJson = responseTaskJson.filter((elem) => elem.tgChatId === tgChatId);
    console.log(responseTaskJson)

    const dateTimeNow = new Date().toUTCString();
    const filterTasks = filterResponseTaskJson.filter((elem) => (new Date(dateTimeNow).setSeconds(0, 0) === new Date(elem.notificationTime).setSeconds(0, 0)));

    filterTasks.forEach((elem) => {
      console.log(elem)
      sender(tgChatId, elem);
    })
  });

  if (stop) {
    settingVerificationJob.stop();
  }

  settingVerificationJob.start();
}

const userTelegramNotify = async (sender) => {

  const usersTGChatId = await fetch('http://localhost:5000/api/tg/chatId');
  const usersTGChatIdJson = await usersTGChatId.json();

  console.log(usersTGChatIdJson)
  usersTGChatIdJson.forEach((tgChatId) => {
    settingVerification(tgChatId, false, sender)
  })
}

module.exports = { settingVerification, userTelegramNotify };
