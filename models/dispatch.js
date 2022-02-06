const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const dispatchSchema = new mongoose.Schema({
  unit: String,
  stock: String,
  quantity: Number,
  createdAt: {
    type: String,
    default: DateTime.now().toLocaleString(),
  }
});

module.exports = mongoose.model('Dispatch', dispatchSchema);
