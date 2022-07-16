const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Brand = require('./brand');

const partSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, trim: true},
  // brand: String
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema);
