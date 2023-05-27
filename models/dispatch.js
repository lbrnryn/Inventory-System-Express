const mongoose = require('mongoose');

const dispatch = new mongoose.Schema({
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }
}, { timestamps: true });

module.exports = mongoose.model('Dispatch', dispatch);
