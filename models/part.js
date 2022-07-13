const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Brand = require('./brand');

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  },
  brand: String
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema);
