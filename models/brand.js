const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
