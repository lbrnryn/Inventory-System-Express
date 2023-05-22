const mongoose = require('mongoose');
const Part = require('./part');

const part = new mongoose.Schema({
  name: { type: String, trim: true},
  brand: { type: String, trim: true}
})

const stock = new mongoose.Schema({
  part: part,
  quantity: Number,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Stock', stock);
