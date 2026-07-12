const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderType: { type: String, enum: ['merch', 'ticket'], required: true },
  selection: { type: String, required: true }, // Stores Size or Ticket Tier
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);