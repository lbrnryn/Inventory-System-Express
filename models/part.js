const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Brand = require('./brand');

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  },
  brand: String,
  createdAt: {
    type: String,
    default: DateTime.now().toLocaleString(),
  }
})

module.exports = mongoose.model('Part', partSchema);
