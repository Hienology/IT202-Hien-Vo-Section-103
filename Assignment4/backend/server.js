const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Use environment variable for port, fallback to 3000 for development
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves images from 'backend/public'

// Serve Angular static files in production
if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));
}

// TEMPORARY STATE
let selectedProduct = null;

// DATA (Office Supplies)
const products = [
    { 
        id: 1, 
        name: "Desk Study Lamp", 
        price: 45, 
        description: "Adjustable LED lamp with eye-care technology.", 
        image: `${BASE_URL}/deskstudylamp.jpg` 
    },
    { 
        id: 2, 
        name: "Ergonomic Chair", 
        price: 250, 
        description: "High-back chair with lumbar support.", 
        image: `${BASE_URL}/ergonomicchair.jpg` 
    },
    { 
        id: 3, 
        name: "Standing Table", 
        price: 400, 
        description: "Motorized sit-stand desk for better posture.", 
        image: `${BASE_URL}/standingtable.jpg` 
    },
    { 
        id: 4, 
        name: "Wireless Printer", 
        price: 120, 
        description: "High-speed laser printing with Wi-Fi.", 
        image: `${BASE_URL}/wirelessprinter.jpg` 
    }
];

// ROUTES

app.get('/api/products', (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/select-product', (req, res) => {
    try {
        // Basic validation
        if (!req.body) {
            return res.status(400).json({ success: false, error: "No data received" });
        }
        
        const { id, name, price } = req.body;
        
        // Validate required fields
        if (!id || !name || price === undefined) {
            return res.status(400).json({ 
                success: false, 
                error: "Missing required fields: id, name, or price" 
            });
        }
        
        // Validate types
        if (typeof id !== 'number' || typeof name !== 'string' || typeof price !== 'number') {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid data types" 
            });
        }
        
        // Validate ranges
        if (price < 0 || price > 10000) {
            return res.status(400).json({ 
                success: false, 
                error: "Price must be between 0 and 10000" 
            });
        }
        
        selectedProduct = req.body;
        console.log("User selected:", selectedProduct.name);
        res.json({ success: true, message: "Product selected" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Selection failed" });
    }
});

app.get('/api/selected-product', (req, res) => {
    try {
        if (!selectedProduct) return res.status(404).json({ error: "None selected" });
        res.json(selectedProduct);
    } catch (error) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

app.post('/api/submit-order', (req, res) => {
    try {
        // Basic validation for order submission
        const { customerName, email, address, quantity } = req.body || {};
        
        // Validate customer name (optional but if provided, must be valid)
        if (customerName && (typeof customerName !== 'string' || customerName.trim().length < 2 || customerName.length > 100)) {
            return res.status(400).json({ 
                success: false, 
                error: "Customer name must be between 2 and 100 characters" 
            });
        }
        
        // Validate email (optional but if provided, must be valid)
        if (email && (typeof email !== 'string' || !email.includes('@'))) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid email format" 
            });
        }
        
        // Validate quantity if provided
        if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 1 || quantity > 100)) {
            return res.status(400).json({ 
                success: false, 
                error: "Quantity must be between 1 and 100" 
            });
        }
        
        res.json({ 
            success: true,
            message: "Your item will be delivered soon." 
        });
    } catch (error) {
        res.status(500).json({ error: "Order failed" });
    }
});

// Catch-all route - serve Angular app for all non-API routes (must be last)
if (NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode at http://localhost:${PORT}`);
});