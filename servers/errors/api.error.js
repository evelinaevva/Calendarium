module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnAuthorized(message) {
    return new ApiError(401, message);
  }

  static ServerError(message) {
    return new ApiError(500, message);
  }

};
