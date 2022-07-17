const mongoose = require('mongoose');
const Part = require('./part');

const unit = new mongoose.Schema({
  plateNumber: {
    type: String,
    uppercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Unit', unit);
