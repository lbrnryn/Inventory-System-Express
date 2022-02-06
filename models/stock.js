const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Part = require('./part');

const stockSchema = new mongoose.Schema({
  part: String,
  quantity: Number,
  price: Number,
  createdAt: {
    type: String,
    default: DateTime.now().toLocaleString(),
  }
});

module.exports = mongoose.model('Stock', stockSchema);
