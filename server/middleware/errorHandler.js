// const errorHandler = (err, req, res, next) => {
//   let error = { ...err };
//   error.message = err.message;

//   // Log to console for dev
//   console.error(err.stack);

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: err.message || 'Server Error',
//   });
// };

// module.exports = { errorHandler };


// server/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message || 'Server Error' });
}
module.exports = { errorHandler };