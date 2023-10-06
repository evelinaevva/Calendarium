const apiError = require('../errors/api.error');

module.exports = function authMiddleware(req, res, next) {
  if (!req.session.user) {
    throw apiError.UnAuthorized('Пользователь не авторизован');
  }
  next();
};
