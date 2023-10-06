const userService = require("../services/user.service");
const settingsService = require("../services/settings.service");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const ApiError = require("../errors/api.error");
const UserDto = require("../dto/user.dto");
const SettingsDto = require("../dto/settings.dto");
const { defaultUserSettings } = require("./default.app.settings");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка валидации", errors.array());
      }

      const { email, password1, password2 } = req.body;

      if (password1 !== password2) {
        throw ApiError.BadRequest("Не совпадают пароли", errors.array());
      }

      const candidate = await userService.findUser(email);

      if (candidate) {
        throw ApiError.BadRequest("Такой пользователь уже зарегистрирован");
      }

      const hash = await bcrypt.hash(password1, 5);

      const user = await userService.createUser(req.body, hash);

      const userSettings = await settingsService.createUserSettings({
        ...defaultUserSettings,
        userId: user.id,
      });
      req.session.user = new UserDto(user, new SettingsDto(userSettings));

      res.json(new UserDto(user, new SettingsDto(userSettings)));
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка валидации", errors.array());
      }

      const { email, password1 } = req.body;
      const user = await userService.findUser(email);

      if (!user) {
        throw ApiError.UnAuthorized(
          `Пользователь  c почтой: ${email},  не зарегистрирован`
        );
      }

      const isPasswordEqual = await bcrypt.compare(password1, user.password);

      if (!isPasswordEqual) {
        throw ApiError.UnAuthorized("Неверный пароль");
      }

      const userSettings = await settingsService.getUserSettings(user.id);
  
      req.session.user = new UserDto(user, new SettingsDto(userSettings));
      res.json(new UserDto(user, new SettingsDto(userSettings)));
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy();
      res.clearCookie('auth');
      res.json({ message: "Пользователь вышел из учетной записи" });
    } catch (e) {
      next(e);
    }
  }

  async session(req, res, next) {
    try {
      if (req.session.user) {
        res.json({ msg: "ok", user: req.session.user });
        return;
      } 
      if (req.session.passport?.user) {
        res.json({
          msg: "ok-google",
          user: req.session.passport.user,
        });
        return
      } 

      res.json({ msg: "no user" });



    } catch (e) {
        next(e);
    }
  }
}

module.exports = new UserController();
