const {
  NotFoundError,
  ValidationError,
  UnauthorizedError
} = require('../errors/customErrors');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message });
  }

  // Handle other types of errors
  res.status(500).json({ error: 'Something went wrong' });
};

module.exports = { errorHandler };