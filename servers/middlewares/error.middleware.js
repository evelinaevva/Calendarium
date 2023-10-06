const ApiError = require('../errors/api.error');

module.exports = function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    if (err.status === 400) {
      res.status(400).json({ message: err.message, errors: err.errors });
    } else {
      res.status(401).json({ message: err.message, errors: err.errors });
    }
  }else{
    
     res.status(500).json({message:"Непредвиденная ошибка", error: err.stack})

  }

};
