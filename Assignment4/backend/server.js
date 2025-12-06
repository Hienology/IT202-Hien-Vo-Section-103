const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves images from 'backend/public'

// TEMPORARY STATE
let selectedProduct = null;

// DATA (Office Supplies)
const products = [
    { 
        id: 1, 
        name: "Desk Study Lamp", 
        price: 45, 
        description: "Adjustable LED lamp with eye-care technology.", 
        image: "http://localhost:3000/deskstudylamp.jpg" 
    },
    { 
        id: 2, 
        name: "Ergonomic Chair", 
        price: 250, 
        description: "High-back chair with lumbar support.", 
        image: "http://localhost:3000/ergonomicchair.jpg" 
    },
    { 
        id: 3, 
        name: "Standing Table", 
        price: 400, 
        description: "Motorized sit-stand desk for better posture.", 
        image: "http://localhost:3000/standingtable.jpg" 
    },
    { 
        id: 4, 
        name: "Wireless Printer", 
        price: 120, 
        description: "High-speed laser printing with Wi-Fi.", 
        image: "http://localhost:3000/wirelessprinter.jpg" 
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
        if (!req.body) throw new Error("No data received");
        selectedProduct = req.body;
        console.log("User selected:", selectedProduct.name);
        res.sendStatus(200);
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
        res.json({ message: "Your item will be delivered soon." });
    } catch (error) {
        res.status(500).json({ error: "Order failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});