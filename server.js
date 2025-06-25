require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products.js');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
// Add this route to your server.js
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Products API Documentation</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        .endpoint {
          background: #f8f9fa;
          border-left: 4px solid #3498db;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
        }
        .method {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 3px;
          font-weight: bold;
          font-family: monospace;
          margin-right: 10px;
        }
        .get { background: #e3f2fd; color: #1976d2; }
        .post { background: #e8f5e9; color: #388e3c; }
        .put { background: #fff3e0; color: #ffa000; }
        .delete { background: #ffebee; color: #d32f2f; }
        .path {
          font-family: monospace;
          font-size: 16px;
        }
        .query-param {
          font-style: italic;
          color: #7f8c8d;
        }
        .note {
          background: #fffde7;
          padding: 10px;
          border-left: 4px solid #ffd600;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Products API Documentation</h1>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/products</span>
          <p>List all products with optional pagination and filtering</p>
          <p class="query-param">Query parameters: ?category=electronics&page=1&limit=10</p>
        </div>
        
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/products/search</span>
          <p>Search products by name</p>
          <p class="query-param">Query parameter: ?name=laptop</p>
        </div>
        
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/products</span>
          <p>Create a new product</p>
          <div class="note">
            Requires authentication header: <code>X-API-Key: your-secret-key</code>
          </div>
        </div>
        
        <div class="endpoint">
          <span class="method put">PUT</span>
          <span class="path">/api/products/:id</span>
          <p>Update an existing product</p>
          <div class="note">
            Requires authentication header: <code>X-API-Key: your-secret-key</code>
          </div>
        </div>
        
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="path">/api/products/:id</span>
          <p>Delete a product</p>
          <div class="note">
            Requires authentication header: <code>X-API-Key: your-secret-key</code>
          </div>
        </div>
        
        <div class="note">
          <strong>Testing Tip:</strong> Use <a href="https://www.postman.com/" target="_blank">Postman</a> or 
          <a href="https://insomnia.rest/" target="_blank">Insomnia</a> to test POST, PUT, and DELETE endpoints.
        </div>
      </div>
    </body>
    </html>
  `);
});

app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});