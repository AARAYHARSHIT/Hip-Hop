require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your actual MongoDB URI later)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/krsna_portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Matrix Database Connected'))
  .catch(err => console.log(err));

// The Checkout API Route
app.post('/api/checkout', async (req, res) => {
  try {
    const { name, email, orderType, selection } = req.body;
    
    const newOrder = new Order({ name, email, orderType, selection });
    await newOrder.save();
    
    res.status(201).json({ message: 'Transaction Successful: Data mapped to core.' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error during transaction.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));