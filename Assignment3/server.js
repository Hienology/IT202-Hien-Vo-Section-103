const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /api/count
app.post('/api/count', (req, res) => {
    const text = req.body.text || '';
    if (!text) return res.status(400).json({ error: 'Text is required in request body' });
    const result = countVowelsConsonants(text);
    res.json(result);
});

// GET /api/count
app.get('/api/count', (req, res) => {
    const text = (req.query.text || '');
    if (!text) return res.status(400).json({ error: 'Text query parameter is required' });
    const result = countVowelsConsonants(text);
    res.json(result);
});

// POST /api/bmi
app.post('/api/bmi', (req, res) => {
    const { weight, feet, inches } = req.body;
    if (typeof weight !== 'number' || typeof feet !== 'number' || typeof inches !== 'number') {
        return res.status(400).json({ error: 'Weight, feet, and inches must be numbers' });
    }
    const bmi = calculateBMIValue(weight, feet, inches);
    res.json({ bmi });
});

// GET /api/bmi
app.get('/api/bmi', (req, res) => {
    const weight = parseFloat(req.query.weight);
    const feet = parseFloat(req.query.feet);
    const inches = parseFloat(req.query.inches);
    if (isNaN(weight) || isNaN(feet) || isNaN(inches)) {
        return res.status(400).json({ error: 'Weight, feet, and inches must be provided as numbers' });
    }
    const bmi = calculateBMIValue(weight, feet, inches);
    res.json({ bmi });
});

app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
    console.log("Open the link above in your browser!");
});