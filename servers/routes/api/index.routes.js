const router = require('express').Router();
const settingsRouter = require('./settings.routes')
const userRouter = require('./user.routes');
const taskRouter = require('./task.routes');
const timeZoneRouter = require('./timezone.routes');
const telegramRouter = require('./telegram.routes');


router.use('/user/settings', settingsRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);
router.use('/timezone', timeZoneRouter);
router.use('/tg', telegramRouter);


module.exports = router;
