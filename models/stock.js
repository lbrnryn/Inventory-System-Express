const mongoose = require('mongoose');

const stock = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
  quantity: Number,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Stock', stock);
