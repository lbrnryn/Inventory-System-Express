const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Part = require('./part');

const stockSchema = new mongoose.Schema({
  part: String,
  brand: String,
  quantity: Number,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);
