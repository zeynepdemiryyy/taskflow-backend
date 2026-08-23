const errorHandler = (err, req, res, next) => {
  console.error('\x1b[31m[HATA]\x1b[0m', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.name || 'Server Error',
    message: err.message || 'Sunucu tarafında beklenmeyen bir hata oluştu.'
  });
};

module.exports = errorHandler;
