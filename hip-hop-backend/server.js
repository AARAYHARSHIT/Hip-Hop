const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and allow cross-origin requests from your Vite frontend
app.use(cors());
app.use(express.json());

// Temporary in-memory database
const orders = [];

// The API Route your React frontend is trying to hit
app.post('/api/checkout', (req, res) => {
  const { name, email, orderType, selection } = req.body;
  
  // Log the incoming order to your terminal
  console.log(`\n📦 NEW ${orderType.toUpperCase()} ORDER RECEIVED:`);
  console.log(`Name: ${name} | Email: ${email} | Selection: ${selection}`);

  // Save it to our temporary array
  orders.push({ name, email, orderType, selection, timestamp: new Date() });

  // Send the success response back to React
  res.status(201).json({ message: 'Transaction Successful: Data mapped to core.' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n🔥 Backend Server running on http://localhost:${PORT}`);
  console.log('📡 Ready to receive checkout requests from the 3D UI...');
});