const router = require('express').Router();
const { body } = require('express-validator');
const telegramController = require('../../controllers/telegram.controller');
const taskController = require('../../controllers/task.controller')

router.get('/upcoming/', telegramController.getUpcomingTasksTg);

router.get('/chatId/', telegramController.getChatId);

// получить настройки пользователя
router.get('/:email', telegramController.getUserSettingsByEmail);

// обновление настроек пользователя по userId
router.patch('/', telegramController.userSetSettings);

router.patch('/confirm/:taskId', telegramController.confirmNotificateTg);






module.exports = router;
