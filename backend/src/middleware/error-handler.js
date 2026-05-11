function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const payload = {
    error: true,
    message:
      statusCode === 500
        ? 'Error interno del servidor.'
        : error.message,
  };

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    payload.details = error.message;
  }

  return res.status(statusCode).json(payload);
}

module.exports = { errorHandler };
