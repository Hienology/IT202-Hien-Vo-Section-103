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
  try {
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Internal server error while fetching products' });
  }
});

// 2. POST /api/select-product - Stores data of the chosen product
app.post('/api/select-product', (req, res) => {
  try {
    const { productId } = req.body;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    selectedProduct = { ...product, quantity: 1 };
    res.json({ 
      success: true, 
      message: `${product.name} has been selected for your order`,
      data: selectedProduct 
    });
  } catch (error) {
    console.error('Error selecting product:', error);
    res.status(500).json({ success: false, error: 'Internal server error while selecting product' });
  }
});

// 3. GET /api/selected-product - Returns the last chosen/selected product
app.get('/api/selected-product', (req, res) => {
  try {
    if (!selectedProduct) {
      return res.status(404).json({ success: false, error: 'No product selected' });
    }
    res.json({ success: true, data: selectedProduct });
  } catch (error) {
    console.error('Error fetching selected product:', error);
    res.status(500).json({ success: false, error: 'Internal server error while fetching selected product' });
  }
});

// 4. POST /api/submit-order - Receives order data and sends confirmation
app.post('/api/submit-order', (req, res) => {
  try {
    if (!selectedProduct) {
      return res.status(400).json({ success: false, error: 'No product selected' });
    }

    const orderConfirmation = {
      success: true,
      message: 'Order confirmed successfully!',
      data: {
        orderId: Math.floor(Math.random() * 10000) + 1000,
        product: selectedProduct,
        total: selectedProduct.price,
        deliveryMessage: 'We will deliver soon',
        orderDate: new Date().toISOString()
      }
    };

    // Clear selected product after order
    selectedProduct = null;

    res.status(201).json(orderConfirmation);
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ success: false, error: 'Internal server error while submitting order' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
