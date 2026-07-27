require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
// Note: We are using a local URI for now. You will swap this for your Atlas URI later.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/krsna_portfolio';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🟢 MongoDB Matrix Connected Successfully'))
  .catch(err => console.error('🔴 MongoDB Connection Error:', err));

// 2. Status Route
app.get('/', (req, res) => {
  res.send('🔥 KR$NA Backend API Engine is live and routing traffic.');
});

// 3. The Live Checkout API Route
app.post('/api/checkout', async (req, res) => {
  try {
    const { name, email, orderType, selection } = req.body;
    
    console.log(`\n📦 PROCESSING NEW ${orderType.toUpperCase()} ORDER...`);
    
    // Create a new document using our Mongoose Model
    const newOrder = new Order({ 
      name, 
      email, 
      orderType, 
      selection 
    });
    
    // Save it permanently to the database
    await newOrder.save();
    
    console.log(`✅ Order saved for: ${email}`);
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