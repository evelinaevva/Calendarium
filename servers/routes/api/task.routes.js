const router = require('express').Router();
const taskController = require('../../controllers/task.controller');
const upload = require('../../services/multer.service');

// создать задачу для пользователя
 router.post('/',
  upload.single('file'),
  taskController.addTask
);

router.patch('/confirm', taskController.confirmNotificateEmail);

// получить список задач для уведомления по почте 
router.get('/upcoming', taskController.getUpcomingTasks);

// ?
router.patch('/upcoming/:taskId', taskController.setNextNotificationTime); 


// получить все задачи пользователя вместе с датами уведомлений:

router.get('/all', taskController.getAllTasks);


router.get(
  '/:id',
  taskController.getTask
);

router.get(
  '/all/:userId',
  taskController.getUserTasks
);

router.put(
  '/',
  upload.single('file'),
  taskController.updateTask
);

router.delete(
  '/',
  taskController.deleteTask
);




module.exports = router;
