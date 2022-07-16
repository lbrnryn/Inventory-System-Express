const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Part = require('./part');

const partSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, trim: true},
  // brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
  brand: { type: String, uppercase: true, trim: true}
})

const stockSchema = new mongoose.Schema({
  // part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
  part: partSchema,
  quantity: Number,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);
