const { UnauthorizedError } = require('../errors/customErrors');

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new UnauthorizedError('Invalid or missing API key');
  }
  next();
};

module.exports = { authenticate };