const router = require('express').Router();
const timeZoneController = require('../../controllers/timezone.controller');

router.get('/', timeZoneController.getTimeZones);


module.exports = router;
