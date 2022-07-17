const mongoose = require('mongoose');

const dispatch = new mongoose.Schema({
  plateNumber: String,
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }
}, { timestamps: true });

module.exports = mongoose.model('Dispatch', dispatch);
