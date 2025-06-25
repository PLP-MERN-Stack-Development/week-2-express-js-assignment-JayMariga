const { ValidationError } = require('../errors/customErrors');

const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  
  if (!name || typeof name !== 'string') {
    throw new ValidationError('Invalid or missing product name');
  }
  
  if (!price || typeof price !== 'number' || price <= 0) {
    throw new ValidationError('Invalid or missing product price');
  }
  
  if (!category || typeof category !== 'string') {
    throw new ValidationError('Invalid or missing product category');
  }
  
  next();
};

module.exports = { validateProduct };