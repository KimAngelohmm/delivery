// server.js
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow your front-end to talk in dev:
app.use(cors());
app.use(bodyParser.json());

// In-memory store for demo:
const orders = [];

// Validation helpers
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidMobile(mobile) {
  return /^9\d{9}$/.test(mobile);
}

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const {
    fullName,
    email,
    mobile,
    address,
    notes,
    addressType,
    payment,
  } = req.body;

  // Basic validation
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ error: 'Full name is required' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!isValidMobile(mobile)) {
    return res.status(400).json({ error: 'Invalid mobile number' });
  }
  if (!address || !address.trim()) {
    return res.status(400).json({ error: 'Address is required' });
  }
  if (!addressType) {
    return res.status(400).json({ error: 'Address type is required' });
  }
  if (!payment) {
    return res.status(400).json({ error: 'Payment method is required' });
  }

  // Build order object
  const order = {
    id: orders.length + 1,
    fullName,
    email,
    mobile,
    address,
    notes: notes || '',
    addressType,
    payment,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  // In a real app you'd save to a DB here

  res.status(201).json({ message: 'Order confirmed', order });
});

// GET all orders (for testing)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
