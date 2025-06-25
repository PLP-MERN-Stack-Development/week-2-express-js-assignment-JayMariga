const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors/customErrors');

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High performance laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest smartphone model',
    price: 699.99,
    category: 'Electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Headphones',
    description: 'Noise cancelling headphones',
    price: 199.99,
    category: 'Electronics',
    inStock: false
  }
];

function getAllProducts(category, page = 1, limit = 10) {
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    total: filteredProducts.length,
    page,
    limit,
    products: paginatedProducts
  };
}

function getProductById(id) {
  return products.find(product => product.id === id);
}

function createProduct(productData) {
  const newProduct = {
    id: uuidv4(),
    ...productData,
    inStock: productData.inStock !== undefined ? productData.inStock : true
  };
  products.push(newProduct);
  return newProduct;
}

function updateProduct(id, productData) {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...productData };
  return products[index];
}

function deleteProduct(id) {
  const initialLength = products.length;
  products = products.filter(product => product.id !== id);
  return products.length !== initialLength;
}

function searchProducts(name) {
  return products.filter(product =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
}

function getProductStats() {
  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    byCategory: {}
  };
  
  products.forEach(product => {
    if (!stats.byCategory[product.category]) {
      stats.byCategory[product.category] = 0;
    }
    stats.byCategory[product.category]++;
  });
  
  return stats;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
};