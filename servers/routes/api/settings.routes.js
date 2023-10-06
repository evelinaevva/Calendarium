const router = require('express').Router();
const settingsController = require('../../controllers/settings.controller');
const { body } = require('express-validator');

router.post(
  '/',
  settingsController.update
);


module.exports = router;
