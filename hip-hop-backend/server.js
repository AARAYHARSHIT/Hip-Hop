const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('🔥 KR$NA Backend API Engine is live and routing traffic.');
});

// Mock Checkout Route (No Database)
app.post('/api/checkout', (req, res) => {
  try {
    const { name, email, orderType, selection } = req.body;
    
    console.log(`\n📦 PROCESSING NEW ORDER...`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Selection: ${selection}`);
    
    // Simulate a successful save without actually using a database
    console.log(`✅ Order processed successfully for: ${email}`);
    
    // Send the success response back to the frontend
    res.status(201).json({ message: 'Transaction Successful: Data mapped to core.' });
  } catch (error) {
    console.error('Transaction Failed:', error);
    res.status(500).json({ error: 'Server Error during transaction.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}`);
});