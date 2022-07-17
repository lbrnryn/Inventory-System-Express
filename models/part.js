const mongoose = require('mongoose');

const part = new mongoose.Schema({
  name: { type: String, uppercase: true, trim: true},
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
}, { timestamps: true })

module.exports = mongoose.model('Part', part);
