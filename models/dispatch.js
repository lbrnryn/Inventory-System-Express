const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const dispatchSchema = new mongoose.Schema({
  unit: String,
  stock: String,
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('Dispatch', dispatchSchema);
