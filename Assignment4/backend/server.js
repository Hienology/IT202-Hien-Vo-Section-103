const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for frontend
app.use(cors());

// Product data - 4 products
const products = [
  {
    id: 1,
    name: 'Desk Study Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for studying and working.',
    price: 45.99,
    imageUrl: 'http://localhost:3000/deskstudylamp.jpg'
  },
  {
    id: 2,
    name: 'Ergonomic Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height. Designed for all-day comfort.',
    price: 299.99,
    imageUrl: 'http://localhost:3000/ergonomicchair.jpg'
  },
  {
    id: 3,
    name: 'Standing Table',
    description: 'Height-adjustable standing desk with electric motor. Switch between sitting and standing positions effortlessly.',
    price: 499.99,
    imageUrl: 'http://localhost:3000/standingtable.jpg'
  },
  {
    id: 4,
    name: 'Wireless Printer',
    description: 'All-in-one wireless printer with scanning and copying capabilities. High-quality prints with fast speeds.',
    price: 179.99,
    imageUrl: 'http://localhost:3000/wirelessprinter.jpg'
  }
];

// Store selected product (in-memory)
let selectedProduct = null;

// API Routes

// 1. GET /api/products - Returns list of 4 products in JSON
app.get('/api/products', (req, res) => {
  res.json(products);
});

// 2. POST /api/select-product - Stores data of the chosen product
app.post('/api/select-product', (req, res) => {
  const { productId } = req.body;
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  selectedProduct = { ...product, quantity: 1 };
  res.json({ 
    success: true, 
    message: 'Product selected successfully',
    product: selectedProduct 
  });
});

// 3. GET /api/selected-product - Returns the last chosen/selected product
app.get('/api/selected-product', (req, res) => {
  if (!selectedProduct) {
    return res.status(404).json({ error: 'No product selected' });
  }
  res.json(selectedProduct);
});

// 4. POST /api/submit-order - Receives order data and sends confirmation
app.post('/api/submit-order', (req, res) => {
  if (!selectedProduct) {
    return res.status(400).json({ error: 'No product selected' });
  }

  const orderConfirmation = {
    success: true,
    message: 'Order confirmed successfully!',
    orderId: Math.floor(Math.random() * 10000) + 1000,
    product: selectedProduct,
    total: selectedProduct.price,
    deliveryMessage: 'We will deliver soon',
    orderDate: new Date().toISOString()
  };

  // Clear selected product after order
  selectedProduct = null;

  res.status(201).json(orderConfirmation);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
