const { validationResult } = require('express-validator');
const ApiError = require('../errors/api.error');
const settingsService = require('../services/settings.service');

class SettingsController {
  async update(req, res, next) {
    try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       throw ApiError.BadRequest('Ошибка валидации', errors.array());
     }
     
     const { id, settings } = req.body;
     const targetSettings = await settingsService.getUserSettings(id);

     if (!targetSettings) {
       throw ApiError.BadRequest(
         `Пользователь не найден`
       );
     }

     const result = await settingsService.updateUserSettings({...settings, settingId: targetSettings.id});
     if (!result) {
      throw ApiError.BadRequest('Ошибка при обновлении настроек пользователя');
     }

     res.json({success: true, message: 'Настройки обновлены'});
   } catch (e) {
     next(e);
   }
 }

}

module.exports = new SettingsController();

