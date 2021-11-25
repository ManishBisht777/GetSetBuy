const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "internal server error";

  // wrong mongodb id

  if (err.name === "CastError") {
    const message = `Resource not found. invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  // duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new Errorhandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new Errorhandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new Errorhandler(message, 400);
  }

  res.status(status).json({
    success: false,
    message: message,
  });
};
