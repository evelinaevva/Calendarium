const { settingVerification } = require("./tasks");

// функция для подписки на уведомления в tg
const addSettings = async (email, tgLogin, tgChatId, sender) => {

  const userResponse = await fetch(`http://localhost:5000/api/tg/${email}`);
  const userResponseJson = await userResponse.json();

  if (userResponseJson.msg === 'пользователь не найден') {
    return `Пользователя с таким email не существует`;
  }

  if (userResponseJson.userSettings.tgNotify) {
    return 'Вы уже подписаны на уведомления';
  }

  const settingResponse = await fetch('http://localhost:5000/api/tg', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userResponseJson.userId,
      settings: {
        tgLogin,
        tgChatId,
        tgNotify: true,
      }
    })
  });

  const settingResponseJson = await settingResponse.json();

  if (settingResponseJson) {
    settingVerification(tgChatId, false, sender);
    return 'Вы успешно подписались на уведомления';
  }
  return userResponseJson;
};

// функция для отписки от уведомления в tg
const unsubscribe = async (email) => {
  const userResponse = await fetch(`http://localhost:5000/api/tg/${email}`);
  const userResponseJson = await userResponse.json();

  if (userResponseJson.msg === 'пользователь не найден') {
    return `Пользователя с таким email не существует`;
  }

  if (!userResponseJson.userSettings.tgNotify) {
    return 'Вы не подписаны на уведомления';
  }

  const settingResponse = await fetch('http://localhost:5000/api/tg', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userResponseJson.userId,
      settings: {
        tgLogin: null,
        tgChatId: null,
        tgNotify: false,
      }
    })
  });

  const settingResponseJson = await settingResponse.json();

  if (settingResponseJson) {
    return 'Вы успешно отписались от уведомлений';
  }
}

module.exports = { addSettings, unsubscribe };
