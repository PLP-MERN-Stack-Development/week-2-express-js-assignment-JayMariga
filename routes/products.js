const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
} = require('../models/Product');
const { authenticate } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validator');

// Get all products with filtering and pagination
router.get('/', (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const products = getAllProducts(category, parseInt(page), parseInt(limit));
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Search products by name
router.get('/search', (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    const results = searchProducts(name);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Get product statistics
router.get('/stats', (req, res, next) => {
  try {
    const stats = getProductStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// Get single product
router.get('/:id', (req, res, next) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Create new product (with authentication and validation)
router.post('/', authenticate, validateProduct, (req, res, next) => {
  try {
    const newProduct = createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Update product (with authentication and validation)
router.put('/:id', authenticate, validateProduct, (req, res, next) => {
  try {
    const updatedProduct = updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      throw new NotFoundError('Product not found');
    }
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// Delete product (with authentication)
router.delete('/:id', authenticate, (req, res, next) => {
  try {
    const deleted = deleteProduct(req.params.id);
    if (!deleted) {
      throw new NotFoundError('Product not found');
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;